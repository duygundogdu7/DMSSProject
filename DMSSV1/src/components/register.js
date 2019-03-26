import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input} from './common';

class Register extends Component {
  state ={
      ad:'',
      email:'',
      password:'',
      loginResponse:''
  }
  render() {
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
            <View style={styles.buttonWrapper}>
              <Button color='#E87B79' title='Kaydol' />
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