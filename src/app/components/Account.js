import React from 'react';
import { Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Auth, API } from 'aws-amplify';

class Account extends React.Component {
  constructor(props){
    super(props);
    self = this;
    this.state = {
      accountValue: 0.00,
      apiResponse: null,
    }
  }
  static navigationOptions = {
    title: 'Account',
    headerLeft: null,
    headerRight: <TouchableOpacity
                    onPress={() => {
                      Auth.signOut()
                      .then(data => {
                        console.log("Logout successful!");
                        self.props.navigation.navigate('Home');
                      })
                      .catch(err => console.log(err));
                      }
                    }><Text style={{fontSize: 18, lineHeight: 27, color: '#FFFFFF75'}}>Logout</Text></TouchableOpacity>,
    headerRightContainerStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    }
  };

  componentDidMount() {
    console.log("Account did mount");
    this.getData();
  }

  async getData() {
    const path = "/coinblend-db-test/object/";
    try {
      const apiResponse = await API.get("coinblend-db-testCRUD", path);
      this.setState({apiResponse:apiResponse, accountValue:apiResponse.accountValue});

      console.log("response from getting note: " + JSON.stringify(apiResponse));
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <ImageBackground source={require('../img/LandingPage/LandingPage.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={styles.introText}>${this.state.accountValue}</Text>
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

export default Account;
