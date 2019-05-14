import React, { Component } from 'react';
import { Input,Button } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {changeTask,deleteTask,completeTask} from '../actions'
import { Actions } from 'react-native-router-flux';




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
       
      <Input text='Görev'
                onChangeText={(text) => {
                      this.setState({
                          title: text
                      })
                }}
                value={this.state.title}/>
                <Input text='Görev'
                onChangeText={(text) => {
                      this.setState({
                          date: text
                      })
                }}
                value={this.state.date}/>
                <Input text='Görev'
                onChangeText={(text) => {
                      this.setState({
                          title: type
                      })
                }}
                value={this.state.type}/>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onSaveClicked.bind(this)}>
            <Text style={styles.loginText}>Görevi Güncelle</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onCompleteClicked.bind(this)}>
            <Text style={styles.loginText}>Tamamla</Text>
          </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer2, styles.loginButton2]} onPress={this.onDeleteClicked.bind(this)}>
          <Text style={styles.loginText2}>Bu Görevi Sil</Text>
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
  },
  buttonContainer2: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    marginLeft: 80
  },
  loginButton2: {
    backgroundColor: "#cc0828",
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