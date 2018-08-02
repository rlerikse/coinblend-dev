import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/app/components/HomeScreen.js';
import RegisterScreen from './src/app/components/RegisterScreen.js';
import RegisterMFA from './src/app/components/RegisterMFA.js';
import LoginScreen from './src/app/components/LoginScreen.js';
import LoginMFA from './src/app/components/LoginMFA.js';
import APITest from './src/app/components/APITest.js';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './awsmobilejs/#current-backend-info/aws-exports.js';

Amplify.configure(aws_exports);

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    RegisterMFA: RegisterMFA,
    Login: LoginScreen,
    LoginMFA: LoginMFA,
    APITest: APITest,
  },
  {
    initialRouteName: 'APITest',
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
