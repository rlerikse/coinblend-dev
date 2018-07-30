import React from 'react';
import { Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
var self;

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    self = this;
  }
  static navigationOptions = {
    headerRight: <TouchableOpacity
                    onPress={() => {
                      self.props.navigation.navigate('Login');
                    }}><Text style={{fontSize: 18, lineHeight: 27, color: '#FFFFFF75'}}>Login</Text></TouchableOpacity>,
    headerRightContainerStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    }
  };
  render() {
    return (
      <ImageBackground source={require('../img/LandingPage/LandingPage.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={styles.introText}>Welcome to CoinBlend!</Text>
        </View>
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
  introText: {
    fontSize: 25,
    lineHeight: 27,
    color: '#FFFFFF',
  },
  registerButton: {
    marginBottom: 11,
    width: 330,
    height: 43,
    backgroundColor: '#FFFFFF85',
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
  loginText: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FFFFFF75',
  },
});

export default HomeScreen;
