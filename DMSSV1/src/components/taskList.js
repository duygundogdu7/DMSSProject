import React, {Component} from 'react';
import { FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';
import TaskItem from './taskItem';
class TaskList extends Component {
  renderItem = ({item}) => {
    return (
      <TaskItem task={item}/>
    );
  }

    render() {
      console.log(this.props)
      const {tasks} = this.props;
        return (
          <View>
         <FlatList
          data={tasks}
          renderItem={this.renderItem}
            />
          </View>
       
        );
      }
}

const mapStateToProps = state => {
  return{
    tasks: state.tasks
  }
}


export default connect(mapStateToProps)(TaskList);
