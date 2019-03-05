import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input} from './common';
import axios from 'axios';

class LoginForm extends Component {
    state ={
        email:'',
        password:''
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
                      url: 'http://192.168.43.165:8086/user',
                      data: {
                          email: this.state.email,
                          password: this.state.password,
                      }
                  }).then(obj => {
                      console.log(obj.data);
                  })
                  }}
                color='#E87B79' title='giris' />
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
