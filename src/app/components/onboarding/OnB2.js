import React from 'react';
import { Button,
  View,
  Text,
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
import { Auth, API } from 'aws-amplify';

class OnB2 extends React.Component {
  static navigationOptions = {
    title: 'Risk Analysis',
  };

  constructor(props) {
    super(props);
    this.state = {
      question: 'How much experience do you have with digital assets and/or blockchain technology?',
      a0: 'None',
      a1: 'Not much',
      a2: "I know what I'm doing",
      a3: "I'm an expert",
      apiResponse: null,
    };
  }

  async getData() {
      const path = "/coinblend-db-test/object/";
      try {
        const apiResponse = await API.get("coinblend-db-testCRUD", path);
        this.setState({apiResponse});
        console.log("response from getting note: " + JSON.stringify(apiResponse));
      } catch (e) {
        console.log(e);
      }
    }
  // Create a new Note according to the columns we defined earlier
  async saveAnswer(answer) {
    let newAnswer = {
      body: {
        "risk0": this.state.apiResponse.risk0,
        "risk1": this.state.apiResponse.risk1,
        "risk2": answer,
        "risk3": this.state.apiResponse.risk3,
        "risk4": this.state.apiResponse.risk4,
      }
    }
    const path = "/coinblend-db-test";

    // Use the API module to save the note to the database
    try {
      const apiResponse = await API.put("coinblend-db-testCRUD", path, newAnswer)
      this.props.navigation.navigate('OnB3');
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    console.log("component did mount");
    this.getData();
  }

  render() {
    return (
      <ImageBackground source={require('coinblend-dev/src/app/img/Register/Register.png')} style={styles.backgroundImage}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.question}>{this.state.question}</Text>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {this.saveAnswer(this.state.a0)}}
          >
            <Text style={styles.a0}>{this.state.a0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {this.saveAnswer(this.state.a1)}}
          >
            <Text style={styles.a1}>{this.state.a1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {this.saveAnswer(this.state.a2)}}
          >
            <Text style={styles.a2}>{this.state.a2}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={() => {this.saveAnswer(this.state.a3)}}
          >
            <Text style={styles.a3}>{this.state.a3}</Text>
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
  question: {
    textAlign: 'center',
    width: 330,
    fontSize: 29,
    lineHeight: 38,
    color: '#FFFFFF95',
    marginBottom: 50,
  },
  answerButton: {
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
  a0: {
    fontSize: 20,
    lineHeight: 27,
    color: '#59DFA6',
  },
  a1: {
    fontSize: 20,
    lineHeight: 27,
    color: '#59DFA6',
  },
  a2: {
    fontSize: 20,
    lineHeight: 27,
    color: '#59DFA6',
  },
  a3: {
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
    textAlign: 'center',
    marginTop: 5,
    fontSize: 15,
    color: '#FFFFFF',
  },
});

export default OnB2;
