import _ from 'lodash';
import React, {Component} from 'react';
import { FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import TaskItem from './taskItem';
import {fetchAllTasks} from '../actions'

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
  var tasks = []
  for (var property in state.tasks.data) {
    tasks = state.tasks.data[property]
  }
  return {
    tasks
  }
}


export default connect(mapStateToProps, {
  fetchAllTasks
})(TaskList);