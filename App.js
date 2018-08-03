import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Loading from './src/app/components/Loading.js';
import HomeScreen from './src/app/components/HomeScreen.js';
import RegisterScreen from './src/app/components/RegisterScreen.js';
import RegisterMFA from './src/app/components/RegisterMFA.js';
import LoginScreen from './src/app/components/LoginScreen.js';
import LoginMFA from './src/app/components/LoginMFA.js';
import OnB0 from './src/app/components/onboarding/OnB0.js';
import OnB1 from './src/app/components/onboarding/OnB1.js';
import OnB2 from './src/app/components/onboarding/OnB2.js';
import OnB3 from './src/app/components/onboarding/OnB3.js';
import OnB4 from './src/app/components/onboarding/OnB4.js';
import Account from './src/app/components/Account.js';
import APITest from './src/app/components/APITest.js';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import aws_exports from './awsmobilejs/#current-backend-info/aws-exports.js';

Amplify.configure(aws_exports);

const RootStack = createStackNavigator(
  {
    Loading: Loading,
    Home: HomeScreen,
    Register: RegisterScreen,
    RegisterMFA: RegisterMFA,
    Login: LoginScreen,
    LoginMFA: LoginMFA,
    OnB0: OnB0,
    OnB1: OnB1,
    OnB2: OnB2,
    OnB3: OnB3,
    OnB4: OnB4,
    Account: Account,
    APITest: APITest,
  },
  {
    initialRouteName: 'Loading',
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
