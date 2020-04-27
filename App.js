// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './component/signup';
import Login from './component/login';
import Timeline from './component/timeline';
import UploadPost from './component/UploadPost';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import AuthContext from './utils/AuthContext';
const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = React.useState(true);
  const [isUserLogged, setUserLogged] = React.useState(false);
  React.useEffect(() => {
    AsyncStorage.getItem('username').then(response => {
      if (response) setUserLogged(true);
      else {
        setUserLogged(false);
      }
      setIsAuthenticating(false);
    });
  });

  const authContext = React.useMemo(
    () => ({
      LOG_IN: () => {
        setUserLogged(true);
      },
      LOG_OUT: () => {
        setUserLogged(false);
      },
    }),
    [],
  );

  if (isAuthenticating) {
    return <ActivityIndicator />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isUserLogged ? (
          <Stack.Navigator>
            <Stack.Screen
              name="timeline"
              component={Timeline}
              // initialParams={{setUserLogged: setUserLogged}}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={Login}
              // initialParams={{setUserLogged: setUserLogged}}
            />
            <Stack.Screen name="signup" component={Signup} />
          </Stack.Navigator>
        )}
        {/* <Stack.Navigator>

        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
        <Stack.Navigator>
        <Stack.Screen name="timeline" component={Timeline} />
      </Stack.Navigator> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
