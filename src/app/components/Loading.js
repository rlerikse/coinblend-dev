import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground } from 'react-native';
import { Auth } from 'aws-amplify';

let isAuth;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  async checkAuth(){
    await Auth.currentAuthenticatedUser().then(function(user){
      isAuth = true;
    }).catch(function(error){
      isAuth = false;
    });
    this.props.navigation.navigate(isAuth ? 'Account' : 'Home');
  };

  render() {
    return (
      <ImageBackground source={require('../img/LandingPage/LandingPage.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.introText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  introText: {
    fontSize: 25,
    lineHeight: 27,
    color: '#FFFFFF',
  },
});

export default Loading;
