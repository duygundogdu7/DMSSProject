import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {Input, Spinner} from './common';
import {connect} from 'react-redux';
import {changeTask} from '../actions'
import { Button } from 'react-native-elements';


class UpdateTask extends Component {
  state ={
    title:'',
    id:''
  }
    onSaveClicked(){
      console.log("onSaveClicked")
      console.log( this.state.title)
      this.props.changeTask(task={title: this.state.title,id: this.state.id })
    }

    componentWillMount(){
      const {task} = this.props;
      this.state.title = task.title;
      this.state.id = task.id;
    }

    render() {
        return (
        <View>
        <Input text='Görev'
                onChangeText={(text) => {
                      this.setState({
                          title: text
                      })
                }}
                value={this.state.title}/>



        <Button title="Kaydet" onPress={this.onSaveClicked.bind(this)}/>

       </View>
        )
}

}

const mapStateToProps = state => {
  return{
  }
}


export default connect(mapStateToProps, {
  changeTask
})(UpdateTask);