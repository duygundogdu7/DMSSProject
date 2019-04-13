import _ from 'lodash';
import React, {Component} from 'react';
import { FlatList, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import TaskItem from './taskItem';
import {fetchAllTasks} from '../actions'
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class TaskList extends Component {

  componentDidMount(){
    this.props.fetchAllTasks();
  }

  renderItem = ({item}) => {
    return (
      <TaskItem task={item}/>
    );
  }
  onPlusClicked(){
    Actions.main8()
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
            <Button title="+" onPress={this.onPlusClicked.bind(this)}/>
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