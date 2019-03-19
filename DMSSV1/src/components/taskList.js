import React, {Component} from 'react';
import { FlatList, Text, View} from 'react-native';
import {connect} from 'react-redux';

class TaskList extends Component {
    
    render() {
      console.log(this.props)
      const {tasks} = this.props;
        return (
          <View>
         <FlatList
          data={tasks}
          renderItem={({item}) => <Text>{item}</Text>}
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
