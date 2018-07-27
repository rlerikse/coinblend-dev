import React from 'react';
import { Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import './Landing.css';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  render() {
    return (
      <ImageBackground source={require('../img/Login/Login.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}
            >
            <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
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
  registerButton: {
    marginBottom: 11,
    width: 330,
    height: 43,
    backgroundColor: '#FFFFFF59',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  registerText: {
    fontSize: 20,
    lineHeight: 27,
    color: '#B69FE4',
  },
});

export default LoginScreen;
