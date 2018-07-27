import React from 'react';
import { Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };
  render() {
    return (
      <ImageBackground source={require('../img/Register/Register.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}
            >
            <Text style={styles.registerText}>Create Account</Text>
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
    color: '#59DFA6',
  },
});

export default RegisterScreen;
