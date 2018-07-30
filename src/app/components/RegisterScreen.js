import React from 'react';
import { Button,
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import { Auth } from 'aws-amplify';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Create Account',
  };

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      birthdate: '',
      phone: '',
      email: '',
      password: '',
      confirm: '',
      address: '',
      error: '',
      modalVisible: false,
    };
    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  componentDidMount() {
    console.log("component did mount");
  }

  createUserInAmazonCognito() {
    console.log("Create User called...");

    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        name: this.state.fullname,
        birthdate: this.state.birthdate,
        phone_number: this.state.phone,
        locale: this.state.address,
        address: this.state.address,
      }
    })
    .then(res => {
      console.log("user successfully created!");
      this.props.navigation.navigate('MFA', { user:res, title: 'Confirm Registration', prev: 'Register' });
    })
    .catch(err => this.SetState({error: err.message}));
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <ImageBackground source={require('../img/Register/Register.png')} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
          <View style={{flexDirection: 'row', width: 330}}>
            <Image
              source={require('../img/Register/baseline-person-24px.png')}
              style={{top: 15, marginRight: 11, marginLeft: 1}}
              />
            <View style={styles.inputView}>
              <TextInput
                autoCorrect= {false}
                clearTextOnFocus= {true}
                enablesReturnKeyAutomatically= {true}
                keyboardType= {'default'}
                placeholder= {'full name on id'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'done'}
                textContentType= {'familyName'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(fullname) => this.setState({fullname})}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
            <Image
              source={require('../img/Register/baseline-cake-24px.png')}
              style={{top: 11, marginRight: 9}}
              />
            <View style={styles.inputView}>
              <DatePicker
                style={styles.date}
                date={this.state.birthdate}
                mode={"date"}
                placeholder={"select birthday"}
                placeholderTextColor={"#FFFFFF75"}
                format={"MM-DD-YYYY"}
                androidMode={"spinner"}
                showIcon={false}
                minDate={"01-01-1930"}
                maxDate={"12-31-2050"}
                confirmBtnText={"Confirm"}
                cancelBtnText={"Cancel"}
                blurOnSubmit={true}
                TouchableComponent={TouchableOpacity}
                customStyles={{
                  dateInput: {
                    marginLeft: -4,
                    borderColor: '#FFFFFF00',
                    paddingRight: 139,
                    backgroundColor: '#FFFFFF00',
                  },
                  dateText: {
                    color: '#FFFFFF',
                    paddingRight: 25,
                    fontSize: 15,
                  },
                  placeholderText: {
                    color: '#FFFFFF75',
                    fontSize: 15,
                  },
                }}
                onDateChange={(birthdate) => {
                  this.setState({birthdate});
                  this.focusNextField('phone');
                }}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
            <Image
              source={require('../img/Register/baseline-phone-24px.png')}
              style={{top: 15, marginRight: 9}}
              />
            <View style={styles.inputView}>
              <TextInput
                autoCorrect= {false}
                clearTextOnFocus= {true}
                enablesReturnKeyAutomatically= {true}
                keyboardType= {'phone-pad'}
                placeholder= {'phone number'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'next'}
                textContentType= {'telephoneNumber'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(phone) => this.setState({phone})}
                onSubmitEditing={() => {
                  var formatted = '+1' + this.state.phone;
                  this.setState({phone: formatted})
                  this.focusNextField('email');
                }}
                ref={ input => {
                  this.inputs['phone'] = input;
                }}
                />

            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
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
                returnKeyType= {'next'}
                textContentType= {'emailAddress'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={() => {
                  this.focusNextField('password');
                }}
                ref={ input => {
                  this.inputs['email'] = input;
                }}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
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
                placeholder= {'enter password'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'next'}
                textContentType= {'password'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(password) => this.setState({password})}
                onSubmitEditing={() => {
                  this.focusNextField('confirm');
                }}
                ref={ input => {
                  this.inputs['password'] = input;
                }}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
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
                placeholder= {'confirm password'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'next'}
                textContentType= {'password'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(confirm) => this.setState({confirm})}
                onSubmitEditing={() => {
                  this.focusNextField('address');
                }}
                ref={ input => {
                  this.inputs['confirm'] = input;
                }}
                />
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 330}}>
            <Image
              source={require('../img/Register/baseline-location_city-24px.png')}
              style={{top: 15, marginRight: 7, marginLeft: 2}}
              />
            <View style={styles.inputView}>
              <TextInput
                autoCorrect= {false}
                clearTextOnFocus= {true}
                enablesReturnKeyAutomatically= {true}
                keyboardType= {'default'}
                placeholder= {'full street address'}
                placeholderTextColor= {'#FFFFFF75'}
                returnKeyType= {'done'}
                textContentType= {'fullStreetAddress'}
                underlineColorAndroid= {'transparent'}
                style={styles.input}
                onChangeText={(address) => this.setState({address})}
                ref={ input => {
                  this.inputs['address'] = input;
                }}
                />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={styles.error}>{this.state.error}</Text>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              console.log("Full Name: " + this.state.fullname);
              console.log("Birthday: " + this.state.birthday);
              console.log("Email: " + this.state.email);
              console.log("Password: " + this.state.password);
              console.log("Confirmed Password: " + this.state.confirm);
              console.log("Address: " + this.state.address);
              console.log("Phone: " + this.state.phone);
              if(this.state.fullname == ''){
                this.setState({error: "Full Name Is Required"});
              }
              else if(this.state.birthdate == ''){
                this.setState({error: "Birthdate Is Required"});
              }
              else if(this.state.phone == ''){
                this.setState({error: "Phone Number Is Required"});
              }
              else if(this.state.phone.length != 12){
                this.setState({error: "Invalid Phone Number, Please Use Format +12345678910"});
              }
              else if(this.state.email == ''){
                this.setState({error: "Email Is Required"});
              }
              else if(this.state.password == ''){
                this.setState({error: "Password Is Required"});
              }
              else if(this.state.password.length < 8){
                this.setState({error: "Password Must Be At Least 8 Characters"});
              }
              else if(this.state.password != this.state.confirm){
                this.setState({error: "Passwords Do Not Match"});
              }
              else if(this.state.address == ''){
                this.setState({error: "Address Is Required"});
              }
              else{
                this.createUserInAmazonCognito();
              }
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
    position: 'absolute',
    top: 30,
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
  date: {
    width: 242,
    height: 40,
    backgroundColor: '#FFFFFF00',
  },
  error: {
    marginTop: 5,
    fontSize: 15,
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
