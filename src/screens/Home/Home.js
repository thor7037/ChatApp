import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Home = () => {
  useEffect(() => {
    getUsers();
  }, []);
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        setUsers(res.docs);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={{textAlign: 'center', color: 'purple', fontSize: 34}}>
          Chat
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          console.log(item._data, 'item');
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {chatId: item?._data, id: id})
              }>
              <View
                style={{
                  borderWidth: 2,
                  width: '90%',
                  height: 80,
                  marginHorizontal: 20,
                  marginTop: 10,
                  borderRadius: 22,
                }}
                key={index}>
                <Text style={{fontSize: 22, color: 'black'}}>
                  {item?._data?.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});
