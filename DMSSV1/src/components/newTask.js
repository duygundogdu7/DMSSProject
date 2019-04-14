import React, { Component } from 'react';
import { Input,Button } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight ,TextInput} from 'react-native';
import axios from 'axios';


export default class NewTask extends Component {
  state ={
    title: '',
    addResponse:'',
    error: '',
    loading:false
}

onButtonClicked(){
  this.setState({error: '', loading:true})
  axios({
    method: 'post',
    url: 'http://192.168.0.12:8086/task',
    data: {
        title: this.state.title,
        user_id: '1235'
    }
   }).then((response) => 
  {this.setState({
  addResponse: response.data["res"]
})})
  console.log(this.state.addResponse);
  if(this.state.addResponse == "1")
    Actions.Task();
  else{
    this.setState({
      error: 'Görev eklenirken hata oluştu.',
      loading: false
    })
   
  }
  
}

  render() {
    return (
      <View>
        <TextInput onChangeText={(title) => this.setState({title})}/>       
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onButtonClicked.bind(this)}>
            <Text style={styles.loginText}>Görev ekle</Text>
          </TouchableHighlight>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 20,
     textAlign: 'center',
     fontWeight: 'bold'
   },
   buttonContainer: {
    marginTop: 20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    marginLeft: 80
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
})
