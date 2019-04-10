import React, { Component } from 'react';
import { View, Text,Button, StyleSheet, Image } from 'react-native';
import {Input, Spinner} from './common';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class LoginForm extends Component {
  state ={
      email:'',
      password:'',
      loginResponse:'',
      loading: false,
      error: ''
  }

  onButtonClicked(){
    const {email, password} = this.state;
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
    Actions.main();
    else{
      this.setState({
        error: 'Authentication failed',
        loading: false
      })
    }
  }

onRegisterClicked(){
  Actions.main6()
}
  render() {

      const { error,loading} = this.state;

      const errorMsg = error ? (
        <Text>
          {error}
        </Text>
      ) : null;

      const loginButton = loading ? (
        <Spinner /> ): (
          <View style={styles.buttonWrapper}>
              <Button
              onPress={this.onButtonClicked.bind(this)}
              color='#E87B79' title='Giriş Yap' />
              <Button title="Üye ol" onPress={this.onRegisterClicked.bind(this)}/>
                </View>
        );

      

      return (
        <View>
          <View style={styles.imageWrapper}>
          <Image source={require('../images/kw.png')} />
          </View>
            <View style={this.emailWrapper}>
                <Input text='Email' inputPlaceHolder='Emailinizi giriniz'
                onChangeText={(text) => {
                      this.setState({
                          email: text
                      })
                }}
                value={this.state.email}/>
            </View>
            <View><Input text='Şifreniz' inputPlaceHolder='Şifrenizi giriniz'
                onChangeText={(text) => {
                      this.setState({
                          password: text
                      })
                }}
                secureTextEntry
                value={this.state.password}/>
                </View>
                {errorMsg}
            <View style={styles.buttonWrapper}>
             {loginButton}
                </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  emailWrapper: {
    marginTop: 30
  },
  imageWrapper:{
    marginTop: 30
  },
  buttonWrapper: {
     marginTop: 20,
     height: 49,
     borderRadius: 10,
     justifyContent: 'center',
     fontSize: 18,
     backgroundColor: '#fff'
   },
   errorText: {
     color: 'red',
     fontSize: 20,
     paddingTop: 5,
     alignSelf: 'center'
   }
})
export default LoginForm;
