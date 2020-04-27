import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import UploadPost from './UploadPost';
import PostLoad from './post';
import AsyncStorage from '@react-native-community/async-storage';
import Profile from './profile';

import AuthContext from '../utils/AuthContext';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home raghvendra!</Text>
    </View>
  );
};

const SettingsScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings ok!</Text>
    </View>
  );
};

const Tab = createMaterialBottomTabNavigator();

const Timeline = ({route}) => {
  const fetchData = async () => {
    try {
      let value = await AsyncStorage.getItem('username');
    } catch (err) {
      console.log('####');
    }
  };

  React.useEffect(() => {
    fetchData();
  });

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen name="home" component={PostLoad} />

      <Tab.Screen name="uploadPost" component={UploadPost} />
      {/* initialParams={route.params} */}

      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
};
export default Timeline;
