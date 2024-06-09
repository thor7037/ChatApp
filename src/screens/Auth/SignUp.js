import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const handleSignUp = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: enterPassword,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log(res, 'data');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const navigateOnLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          marginTop: '40%',
          marginBottom: '10%',
          color: 'black',
        }}>
        SignUp
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <TextInput
        placeholder="mobile"
        value={mobile}
        onChangeText={text => setMobile(text)}
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        style={styles.input}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity
        onPress={() => {
          handleSignUp();
        }}
        style={{
          borderRadius: 5,
          backgroundColor: 'blue',
          width: '40%',
          height: '4%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>SignUp</Text>
      </TouchableOpacity>
      <Button title="or Login" onPress={navigateOnLogin} />
    </View>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
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
