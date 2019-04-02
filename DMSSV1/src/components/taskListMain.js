import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import TaskList from './taskList';
import BottomNav from './bottomNav'

export default class TaskListMain extends Component {
 
  render() {
      console.log("tlm render")
    return(
        <View>
           <TaskList/>
           <BottomNav/>
        </View>
    
    );
  }
}