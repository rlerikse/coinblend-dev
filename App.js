import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/app/components/HomeScreen.js';
import RegisterScreen from './src/app/components/RegisterScreen.js';
import LoginScreen from './src/app/components/LoginScreen.js';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Register',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: '#FFFFFF75',
      headerTitleStyle: {
        fontWeight: 'normal',
        backgroundColor: '#FFFFFF00',
      },
    },
  }
);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
