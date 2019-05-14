import React, { Component } from 'react';
import { Input,Button } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight ,TextInput} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';



class NewTask extends Component {
  state ={
    title: '',
    date:'',
    type:'',
    addResponse:'',
    error: '',
    loading:false
}

onButtonClicked(){
  this.setState({error: '', loading:true})
  let id = this.props.id
  axios({
    method: 'post',
    url: 'http://192.168.43.165:8086/task',
    data: {
        title: this.state.title,
        date: this.state.date,
        type: this.state.type,
        user_id: id
    }
   }).then((response) => 
  {this.setState({
  addResponse: response.data["res"]
})})
  console.log(this.state.addResponse);
  if(this.state.addResponse == "1" && this.props.manager == false)
    Actions.MyComponent();
  else if (this.state.addResponse == "1" && this.props.manager == true)
  Actions.MyComponentMan();
  else{
    this.setState({
      error: 'Görev eklenirken hata oluştu.',
      loading: false
    })
}
}

  render() {
    console.log("Manager mı?")
    console.log(this.props.manager)
    return (
      <View>
        <TextInput placeholder="Görev adı" onChangeText={(title) => this.setState({title})}/> 
        <TextInput placeholder="Görev tarihi" onChangeText={(date) => this.setState({date})}/>  
        <TextInput placeholder="Görev tipi" onChangeText={(type) => this.setState({type})}/>        
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onButtonClicked.bind(this)}>
            <Text style={styles.loginText}>Görev ekle</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    manager: state.manager
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

export default connect(mapStateToProps)(NewTask);