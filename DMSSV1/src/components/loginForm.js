import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input} from './common';
class LoginForm extends Component {
    state ={
        email:'',
        password:''
    }
    render() {
        return (
          <View>
              <View>
                  <Input text='Email' inputPlaceHolder='Enter Email' 
                  onChangeText={(text) => {
                        this.setState({
                            email: text
                        })
                  }}
                  value={this.state.email}/>
              </View>
              <View><Input text='Password' inputPlaceHolder='Enter Password' 
                  onChangeText={(text) => {
                        this.setState({
                            password: text
                        })
                  }}
                  secureTextEntry
                  value={this.state.password}/>
                  </View>
              <View>
                  <Button title='giris'/>
                  </View>   
              

          </View>
        );
      }
  

  
}

export default LoginForm;