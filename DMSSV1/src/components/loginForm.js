import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';


export default class LoginView extends Component {

  constructor(props) {
    super(props);
    state = {
      email:'',
      password:'',
      loginResponse:'',
      loading: false,
      error: ''
    }
  }

  onLoginClicked(){
    this.setState({
      error: '',
      loading: true
    })
    axios({
      method: 'post',
      url: 'http://192.168.43.165:8086/user',
      data: {
          email: this.state.email,
          password: this.state.password,
      }
     }).then((response) => 
    {this.setState({
    loginResponse: response.data["res"]
  })})
    console.log(this.state.loginResponse);
    if(this.state.loginResponse== 1)
    Actions.MyComponent();
    else{
      this.setState({
        error: 'Authentication failed',
        loading: false
      })
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