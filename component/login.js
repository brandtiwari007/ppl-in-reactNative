import React, {Component} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import AuthContext from '../utils/AuthContext';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';

const Login = ({navigation, route}) => {
  const {LOG_IN}= React.useContext(AuthContext);
  console.log("route",route)
  const [detail, userdetail] = useState({
    email: '',
    password: '',
    err: '',
  });

  const storeData = async data => {
    console.log('in login storage');
    console.log('@@@@@@@@', data._id);
    console.log('++', data.username);
    console.log('dvv', data.email);
    try {
      await AsyncStorage.setItem('username', data.username);
      await AsyncStorage.setItem('_userid', data._id);
      await AsyncStorage.setItem('email', data.email);
    } catch (err) {}
  };

  const submit = () => {
    axios.post('http://192.168.43.3:8969/login', detail).then(response => {
      if (response.data == 'either email not exist or password not mathched') {
        userdetail({
          err: response.data,
        });
      } else {
        storeData(response.data).then(() => {
          console.log('sucess');

         // route.params.setUserLogged(true);
         LOG_IN()
        });
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{width: 200, alignSelf: 'center', height: 100}}
          source={{
            uri: 'http://192.168.43.3:8969/uploads/logo.png',
          }}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={email => userdetail({...detail, email: email})}
          placeholder="enter your email"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={password => userdetail({...detail, password: password})}
          placeholder="enter your password"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
        />
        <Button onPress={submit} title="submit" />
      </View>
      <View>
        {/* {console.log("email", detail.email)} */}

        {/* <Text h1>{detail.email}</Text> */}
        {/* <Text h1>{detail.password}</Text> */}
        <Text h1>{detail.err}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('signup');
          }}>
          <Text style={{color: 'green'}}>Do not have a account signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
