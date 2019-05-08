import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { connect } from 'react-redux';
import {sendManager} from '../actions';
import {sendID} from '../actions';


class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email:'',
      password:'',
      loginResponse:'',
      userID: '',
      isManager: '',
      loading: false,
      error: ''
    }
  }

  onLoginClicked(){
    this.setState({
      error: '',
      loading: true
    })

    async function fun() {
      await axios({
        method: 'post',
        url: 'http://192.168.43.165:8086/user',
        data: {
            email: this.state.email,
            password: this.state.password,
        }
       }).then((response) => 
      {this.setState({
      loginResponse: response.data["res"],
      userID: response.data["userID"],
      isManager: response.data["isManager"]
    })})
      console.log(this.state.loginResponse);
      console.log(this.state.isManager);
      this.props.sendManager(this.state.isManager);
      this.props.sendID(this.state.userID);
      if(this.state.loginResponse == 1)
        Actions.MyComponent();
      //else if(this.state.loginResponse == 1 && this.setState.isManager == 'true')
      //  Actions.MyComponentMan();
      else{
        this.setState({
          error: 'Authentication failed',
          loading: false
        })
      }
    }
    
  }

  onClickListener () {
    Alert.alert("Şifrenizi unuttuysanız yöneticinize başvurunuz.");
  }

  onRegisterClicked(){
    Actions.Register();
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Şifre"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onLoginClicked.bind(this)}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Şifrenizi mi unuttunuz?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.onRegisterClicked.bind(this)}>
            <Text>Kaydol</Text>
        </TouchableHighlight>
      </View>
    
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
    sendManager: (text) =>dispatch(sendManager(text)),
    sendID: (ID) => dispatch(sendID(ID))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default connect(null, mapDispatchToProps)(LoginView);