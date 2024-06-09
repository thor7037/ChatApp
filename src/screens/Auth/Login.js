import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const [email, setEmail] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const navigation = useNavigation();
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('BottomTab');
  };
  const handleLogin = () => {
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        if (res.docs.length !== 0) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User not found');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32, marginTop: '40%', color: 'black'}}>
        Login
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <TextInput
        placeholder="Enter Password"
        value={enterPassword}
        onChangeText={text => setEnterPassword(text)}
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          borderRadius: 5,
          backgroundColor: 'blue',
          width: '40%',
          height: '5%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity>
      <Button title="or SignUp" onPress={() => handleSignUp()} />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    marginTop: 15,
    borderWidth: 2,
    height: 35,
    width: 312,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    color: 'red',
  },
});
