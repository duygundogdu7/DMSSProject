import _ from 'lodash';
import React, {Component} from 'react';
import { FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import TaskItem from './taskItem';
import {fetchAllTasks, FETCH_TASKS} from '../actions'

class TaskList extends Component {

  componentDidMount(){
    this.props.fetchAllTasks();
  }

  renderItem = ({item}) => {
    return (
      <TaskItem task={item}/>
    );
  }

    render() {
      console.log("tasklist render")
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
  console.log("msp")
  const tasks = _.map(state.tasks, (val) => {
    return { ...val}
  });
  
  console.log(tasks)
  return {
    tasks
  }
}


export default connect(mapStateToProps, {
  fetchAllTasks
})(TaskList);