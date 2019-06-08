import React, { Component } from 'react';
import { Input,Card } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight ,TextInput, Picker} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';



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
    url: 'http://192.168.1.26:8086/task',
    data: {
        title: this.state.title,
        date: this.state.date,
        type: this.state.type,
        user_id: id
    }
   }).then((response) => 
  {this.setState({
  //addResponse: response.data["res"]
})
if(response.status == 200 && this.props.manager == false)
Actions.MyComponent();
else if (response.status == 200 && this.props.manager == true)
Actions.MyComponentMan();
else{
this.setState({
  error: 'Görev eklenirken hata oluştu.',
  loading: false
})
}
})
  //console.log(this.state.addResponse);
  
}

  render() {
    console.log("Manager mı?")
    console.log(this.props.manager)
    return (
      <View>
        <Card>
        <TextInput 
        style={styles.textInput}
              placeholder="Aktivite Detayı"
              placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(title) => this.setState({title})}/>
      <DatePicker 
        style={{width:300}}
        date={this.state.date}
        mode="date"
        placeholder="Tarih seçiniz.."
        format="DD.MM.YYYY"
        minDate="01.05.2016"
        maxDate="03.03.2020"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            marginTop: 5
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({date:date})}}
      />
               
              <Picker
              selectedValue={this.state.yapili}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({type: itemValue})}>
             <Picker.Item label="Önem derecesi" value='0'/>
             <Picker.Item label="Önemli" value="Önemli" />
              <Picker.Item label="Çok Önemli" value="Çok Önemli" />
              </Picker>
         
         
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onButtonClicked.bind(this)}>
            <Text style={styles.loginText}>Görev Ekle</Text>
          </TouchableHighlight>
          </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return{
    id:state.id,
    manager: state.manager
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  textInput:{
    height: 40,
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
    marginBottom: 20,
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
    width:200,
    borderRadius:30,
    marginLeft: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
})

export default connect(mapStateToProps)(NewTask);