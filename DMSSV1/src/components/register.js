import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input} from './common';
import axios from 'axios';

class Register extends Component {
  state ={
      ad:'',
      email:'',
      password:'',
      registerResponse:'',
      error: '',
      loading:false
  }

  onButtonClicked(){
    axios({
      method: 'post',
      url: 'http://192.168.43.165:8086/register',
      data: {
          ad: this.state.ad,
          email: this.state.email,
          password: this.state.password,
      }
     }).then((response) => 
    {this.setState({
    registerResponse: response.data["res"]
  })})
    console.log(this.state.registerResponse);
    if(this.state.registerResponse == 1)
      Actions.auth();
    else{
      this.setState({
        error: 'Register failed',
        loading: false
      })
     
    }
    
  }

  render() {
    const { error,loading} = this.state;

      const errorMsg = error ? (
        <Text>
          {error}
        </Text>
      ) : null;

      const registerButton = loading ? (
        <Spinner /> ): (
          <View style={styles.buttonWrapper}>
              <Button
              onPress={this.onButtonClicked.bind(this)}
              color='#E87B79' title='Kaydol' />
                </View>
        );
      return (
        <View>
            <View>
                <Input text='Adınız' inputPlaceHolder='Adinizi giriniz'
                onChangeText={(text) => {
                      this.setState({
                          ad: text
                      })
                }}
                value={this.state.ad}/>
            </View>
            <View>
                <Input text='Emailiniz' inputPlaceHolder='Emailinizi giriniz'
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
                {registerButton}
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

export default Register;