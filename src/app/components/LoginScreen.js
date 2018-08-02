import React from 'react';
import { Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { Auth } from 'aws-amplify';


class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome Back!',
  };

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
    console.log("Login did mount: " + JSON.stringify(Auth.currentUserPoolUser()));
    console.log("Login Auth user: " + JSON.stringify(Auth.currentAuthenticatedUser()));
  }

  signInAmazonCognito(){
    Auth.signIn(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
        if (res.challengeName == "SMS_MFA"){
          this.props.navigation.navigate('LoginMFA', { user:res });
        }
        else {
          this.props.navigation.navigate('Home');
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ImageBackground source={require('../img/Login/Login.png')} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{flexDirection: 'row', width: 330, left: 5}}>
            <Image
              source={require('../img/Register/baseline-email-24px.png')}
              style={{top: 15, marginRight: 7}}
              />
            <View style={styles.inputView}>
              <TextInput
                autoCorrect= {false}
                clearTextOnFocus= {true}
                enablesReturnKeyAutomatically= {true}
                keyboardType= {'email-address'}
                placeholder= {'email'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'done'}
                textContentType= {'emailAddress'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330, left: 5}}>
            <Image
              source={require('../img/Register/baseline-lock-24px.png')}
              style={{top: 15, marginRight: 8, marginLeft: 2}}
              />
            <View style={styles.inputView}>
              <TextInput
                autoCorrect= {false}
                clearTextOnFocus= {true}
                enablesReturnKeyAutomatically= {true}
                keyboardType= {'default'}
                secureTextEntry= {true}
                placeholder= {'password'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'next'}
                textContentType= {'password'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(password) => this.setState({password})}
                />
            </View>
          </View>
          <Text style={styles.error}>{this.state.error}</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              console.log("Email: " + this.state.email);
              console.log("Password: " + this.state.password);
              console.log("Phone: " + this.state.phone);
              if(this.state.email == ''){
                this.setState({error: "Email Is Required"});
              }
              else if(this.state.password == ''){
                this.setState({error: "Password Is Required"});
              }
              else{
                this.signInAmazonCognito();
              }
            }}
            >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              Auth.signOut()
              .then(data => console.log(data))
              .catch(err => console.log(err));
              }
            }
            >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  loginButton: {
    top: 25,
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
  loginText: {
    fontSize: 20,
    lineHeight: 27,
    color: '#59DFA6',
  },
  inputView: {
    borderBottomColor: "#FFFFFF75",
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  input: {
    fontSize: 15,
    width: 242,
    height: 40,
    borderBottomColor: '#FFFFFF',
    color: '#FFFFFF',
  },
  error: {
    top: 5,
    fontSize: 15,
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
