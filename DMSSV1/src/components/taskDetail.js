import React, { Component } from 'react';
import { Input,Card } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight,Picker } from 'react-native';
import { connect } from 'react-redux';
import {changeTask,deleteTask,completeTask} from '../actions'
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';




class TaskDetail extends Component {
    state ={
      title:'',
      date: '',
      type: '',
      id:''
    }
    onDeleteClicked(){
      this.props.deleteTask(task={id: this.state.id })
      if(this.props.manager == false)
        Actions.MyComponent();
      else  if(this.props.manager == true)
        Actions.MyComponentMan();
    }
    onSaveClicked(){
      this.props.changeTask(task={title: this.state.title,id: this.state.id })
      if(this.props.manager == false)
        Actions.MyComponent();
      else  if(this.props.manager == true)
        Actions.MyComponentMan();

    }
    onCompleteClicked(){
      this.props.completeTask(task={id: this.state.id })
      if(this.props.manager == false)
        Actions.MyComponent();
      else  if(this.props.manager == true)
        Actions.MyComponentMan();
    }
    componentWillMount(){
      const {task} = this.props;
      this.state.title = task.title;
      this.state.id = task.id;
      this.state.date = task.date;
      this.state.type = task.type;
    }

  render() {
    console.log("this.state");
    console.log(this.state);
    console.log("Manager mı")
    console.log(this.props.manager)
    return (
      <View>
       <Card>
      <Input text='Görev'
                onChangeText={(text) => {
                      this.setState({
                          title: text
                      })
                }}
                value={this.state.title}/>
                <Text style={{fontSize:18, marginLeft:10, marginTop:10}}>Tarih:</Text>
                 <DatePicker 
                  style={{width:200, marginLeft:20}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
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
              selectedValue={this.state.type}
              style={{height: 70, width: 200, marginLeft: 20}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({type: itemValue})}>
              <Picker.Item label="Önem Derecesini Seçiniz" value="0" />
              <Picker.Item label="Önemli" value="Önemli" />
              <Picker.Item label="Çok Önemli" value="Çok Önemli" />
              </Picker>   

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onSaveClicked.bind(this)}>
            <Text style={styles.loginText}>Güncelle</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton3]} onPress={this.onCompleteClicked.bind(this)}>
            <Text style={styles.loginText}>Bu Görevi Tamamla</Text>
          </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton2]} onPress={this.onDeleteClicked.bind(this)}>
          <Text style={styles.loginText2}>Bu Görevi Sil</Text>
       </TouchableHighlight> 
       </Card>
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
    borderRadius:30,
    width:150,
    marginLeft: 70
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  loginButton2: {
    backgroundColor: "#cc0828",
  },
  loginButton3: {
    backgroundColor: "#00e600",
  },
  loginText2: {
    color: 'white',
  }
})

const mapStateToProps = state => {
  return{
    manager: state.manager
  }
}


export default connect(mapStateToProps, {
  changeTask,deleteTask,completeTask
})(TaskDetail);