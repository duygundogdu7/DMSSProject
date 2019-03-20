import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input} from './common';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

class LoginForm extends Component {
  state ={
      email:'',
      password:'',
      loginResponse:''
  }
  render() {
      return (
        <View>
            <View>
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
            <View style={styles.buttonWrapper}>
              <Button
              onPress={() => {
                  axios({
                    method: 'post',
                    url: 'http://192.168.0.12:8086/user',
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

                }}
              color='#E87B79' title='Giriş Yap' />
                </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
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
