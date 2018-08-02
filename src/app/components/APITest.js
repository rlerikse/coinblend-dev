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
import { Auth, API } from 'aws-amplify';

class APITest extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Multi-Factor Authentication",
  });

  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      noteId: 'test',
    };
  }

  handleChangeUserId = (event) => {
    this.setState({noteId: event});
  }

  // Create a new Note according to the columns we defined earlier
  async saveNote() {
    let newNote = {
      body: {
        "accountValue": 4.20
      }
    }
    const path = "/coinblend-db-test";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("coinblend-db-testCRUD", path, newNote)
      console.log("response from saving note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    console.log(Auth.currentUserInfo());
  }

  render() {
    return (
      <ImageBackground source={require('../img/Login/Login.png')} style={styles.backgroundImage}>
        <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          this.saveNote();
          }
        }
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ImageBackground>
  );
}
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    top: 300,
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

export default APITest
