import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import Profile from '../../screens/Profile/Profile';
import Home from '../../screens/Home/Home';

const BottomTab = () => {
  // const LogOut = () => {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  // };
  const [selectedTabs, setSelectedTabs] = useState(0);

  return (
    <View style={{flex: 1}}>
      {selectedTabs === 0 ? <Home /> : <Profile />}
      <View style={styles.BottomTab}>
        <TouchableOpacity
          style={[
            styles.Tab,
            {tintColor: selectedTabs === 0 ? 'white' : 'blue'},
          ]}
          onPress={() => {
            setSelectedTabs(0);
          }}>
          <Text style={{color: 'black', fontSize: 22}}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Tab,
            {tintColor: selectedTabs === 1 ? 'white' : 'gray'},
          ]}
          onPress={() => {
            setSelectedTabs(1);
          }}>
          <Text style={{color: 'black', fontSize: 32}}>Profile</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={() => LogOut()}
        style={{
          bottom: 8,
          position: 'absolute',
          borderWidth: 2,
          width: 122,
          height: 20,
          backgroundColor: 'yellow',
        }}>
        <Text style={{color: 'red', textAlign: 'center'}}>LogOut</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default BottomTab;
const styles = StyleSheet.create({
  BottomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '6%',
    flexDirection: 'row',
  },
  Tab: {
    backgroundColor: 'purple',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
