import React, {Component} from 'react';
//import Login from './login'
//import * as React from 'react';
//import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import fun from '../utils/validation';
// import AuthContext from '../utils/AuthContext'

import axios from 'axios';
import {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
  Image,
} from 'react-native';

const Signup = props => {
  // const { signIn } = React.useContext(AuthContext);
  const[wrightemail,setWrightEmail]=useState();
  const [userdetail, setUserDetail] = useState({
    username: '',
    email: '',
    password: '',
    submitted: false,
    firstname: '',
    lastname: '',
    responsegive: '',
    err: '',
  });

  const submit = () => {
    // const regex = new RegExp(fun);
    // if(regex.test(userdetail.email))
    // console.log(fun.email(userdetail.email))
    
   
    if(
      fun.email(userdetail.email)===false)
      // retun (<Text>please enter correct mail</Text>)
      setWrightEmail(true)

      else{


  //  console.log(userdetail);
    if (
      
      userdetail.username &&
      userdetail.email &&
      userdetail.password &&
      userdetail.firstname &&
      userdetail.lastname
    ) {
    } else {
      alert('all data required');
      return false;
    }
    axios.post('http://192.168.43.3:8969/signup', userdetail).then(response => {
      console.log(response);
      if (response.data == 'user exists') {
        console.log('+--=---', response.data);
        // setUserDetail({...userdetail, [username]: text, err: response.data});
        setUserDetail({});
        setUserDetail({
          responsegive: '',
          err: response.data,
        });
      } else if (response.data == 'user created') {
        setUserDetail({
          err: '',
          responsegive: response.data,
        });
        console.log('--=', response.data);
      }
    });
  }
      
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 100, alignSelf: 'center'}}
          source={{
            uri: 'http://192.168.43.3:8969/uploads/logo.png',
          }}
        />
        {/* <Image
        style={{width:50,height:50,alignSelf:'center'}}
        source={{ uri:'http://192.168.43.3:8970/uploads/small.png'}}
        /> */}
        <Text>Username</Text>
        <TextInput
          onChangeText={username =>
            setUserDetail({...userdetail, username: username})
          }
          style={styles.input}
          placeholder="enter your userName"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={userdetail.username}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={password =>
            setUserDetail({...userdetail, password: password})
          }
          style={styles.input}
          placeholder="enter your password"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={userdetail.password}
        />
        <Text>Email</Text>
        <TextInput
          onChangeText={text => setUserDetail({...userdetail, email: text})}
          style={styles.input}
          placeholder="enter your email"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={userdetail.email}
        />
        {wrightemail && 
        <Text>please enter mail in correct format</Text>
        }
        <Text>FirstName</Text>
        <TextInput
          onChangeText={text => setUserDetail({...userdetail, firstname: text})}
          style={styles.input}
          placeholder="enter your firstname"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={userdetail.firstname}
        />
        <Text>LastName</Text>
        <TextInput
          onChangeText={text =>
            setUserDetail({...userdetail, lastname: text, submitted: true})
          }
          style={styles.input}
          placeholder="enter your lastname"
          underlineColorAndroid="transparent"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          value={userdetail.lastname}
        />
        <View style={{marginHorizontal: 10}}>
          <Button
            style={styles.submitButton}
            placeholder="submit"
            onPress={submit}
            title="submit"
          />
        </View>
      </View>
      <View>
        <Text h1>{userdetail.err}</Text>
        <Text h1>{userdetail.responsegive}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setUserDetail({...userdetail, err: ' ', responsegive: ''});
            // props.navigation.navigate('login')
            props.navigation.reset({
              index: 0,
              routes: [{name: 'login'}],
            });
          }}>
          <Text style={{color: 'green'}}>
            Already have an account press here
          </Text>
        </TouchableOpacity>
      </View>
      <View />
    </ScrollView>
  );
};
export default Signup;

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
