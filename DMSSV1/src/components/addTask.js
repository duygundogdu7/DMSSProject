import React, { Component } from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';
import {Input, Spinner} from './common';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


class AddTask extends Component {
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
      Actions.main();
    else{
      this.setState({
        error: 'Görev eklenirken hata oluştu.',
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
              color='#E87B79' title='Ekle' />
                </View>
        );
      return (
        <View>
            {/*TODO: Add more properties */}

            <View>
                <Input text='Görev' inputPlaceHolder="Mehmet Bey'i Ara"
                onChangeText={(text) => {
                      this.setState({
                          title: text
                      })
                }}
                value={this.state.title}/>
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

export default AddTask;