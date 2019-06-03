import React, { Component } from 'react';
import { Input,Card } from 'react-native-elements';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {approveTask} from '../actions'
import { Actions } from 'react-native-router-flux';




class ApprovalDetail extends Component {
    state ={
      title:'',
      date: '',
      type: '',
      id:''
    }
    onYesClicked(){
      this.props.approveTask(task={id: this.state.id })
      if(this.props.manager == false)
        Actions.MyComponent();
      else  if(this.props.manager == true)
        Actions.MyComponentMan();
    }
    onNoClicked(){
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
        <Text style={styles.info}>Bu görevi onaylıyor musunuz?</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onYesClicked.bind(this)}>
            <Text style={styles.loginText}>Evet</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButtonNo]} onPress={this.onNoClicked.bind(this)}>
            <Text style={styles.loginText}>Hayır</Text>
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
   info:{
    fontSize:18,
    color: "#000000",
    marginTop:10,
    marginLeft: 60,
  },
   buttonContainer: {
    marginTop: 20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
    marginLeft: 100,
  },
  loginButton: {
    backgroundColor: "#00e600",
  },
  loginButtonNo: {
    backgroundColor: "#cc0828",
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
  approveTask
})(ApprovalDetail);