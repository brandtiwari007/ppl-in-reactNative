import React from 'react';
import {useState, useEffect} from 'react';

import {View, Image, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native'
 import AuthContext from '../utils/AuthContext'


const Profile = ( {navigation,route}) => {
    const{LOG_OUT} =React.useContext(AuthContext)

    console.log("params",route)
  const [userdetail, setDetail] = useState();
  const [email, setEmail] = useState();
  const fetchData = () => {
    AsyncStorage.getItem('email').then(response => {
      console.log('uy', response);
      setEmail({...userdetail, email: response});
    });
  };
  const fetchData2 = () => {
    console.log('djb');
    AsyncStorage.getItem('username').then(response => {
      console.log('uy', response);
      setDetail({...userdetail, username: response});
    });
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  return (
    <>
      {!userdetail ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
              }}
              source={{
                uri: 'http://192.168.43.3:8969/uploads/t.jpeg',
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 25}}>username:</Text>
            <Text style={{fontSize: 25}}>{userdetail.username}</Text>
            <Text style={{fontSize: 25}}>Email</Text>
            <Text style={{fontSize: 25}}>{email.email}</Text>
          </View>
          <View style={{padding:90}}>
            <Button onPress={()=>{
                AsyncStorage.clear();
                // navigation.pop();
                // navigation.navigate('login')
             //   route.params.setUserLogged(false)
             LOG_OUT()




            }} title="signout"/>
          </View>
        </View>
      )}
    </>
  );
};
export default Profile;
