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

class RegisterMFA extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Confirm Registration",
   });

  constructor(props) {
    super(props);
    this.state = {
      authCode: '',
      username: this.props.navigation.state.params.username,
    };
  }

  componentDidMount() {
    console.log("RegisterMFA did mount");
  }

  confirmUser() {
    Auth.confirmSignUp(this.state.username, this.state.authCode)
    .then(res => {
      console.log('successful confirmation: ', res);
      this.setState({authCode:''});
      this.props.navigation.navigate('Home', { user:res });
    })
    .catch(err => {
      console.log('error confirming user: ', err)
    })
  }

  render() {
    return (
      <ImageBackground source={require('../img/Login/Login.png')} style={styles.backgroundImage}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
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
      placeholder= {'authentication code'}
      placeholderTextColor= {'#FFFFFF75'}
      returnKeyType= {'next'}
      textContentType= {'password'}
      underlineColorAndroid= {'transparent'}
      style={styles.input}
      onChangeText={(authCode) => this.setState({authCode})}
      />
      </View>
      </View>
      <Text style={styles.error}>{this.state.error}</Text>
      <TouchableOpacity
      style={styles.confirmButton}
      onPress={() => {
        if(this.state.authCode == ''){
          this.setState({error: "Authentication Code Is Required"});
        }
        else{
          this.confirmUser();
        }
      }}
      >
      <Text style={styles.confirmText}>Confirm</Text>
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
  confirmButton: {
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
  confirmText: {
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

export default RegisterMFA;
