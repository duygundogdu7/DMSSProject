import React, { Component } from 'react';
import {StyleSheet, Text} from 'react-native';
import {Card} from './common';

class TaskItem extends Component {
    render(){
        const {task} = this.props;
        console.log("single");
        console.log(task);
        return (
            <Card>
              <Text style={styles.titleStyle}>{task.title}</Text>
              <Text style={styles.titleStyle}>{task.user_id}</Text>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 16,
      color: 'black'
    },
    authorStyle: {
      fontSize: 13,
      color: 'gray'
    },
    descriptionStyle: {
      marginLeft: 10,
      marginRight: 10,
      fontSize: 13,
      color: 'gray'
    }
  })


  export default TaskItem;
