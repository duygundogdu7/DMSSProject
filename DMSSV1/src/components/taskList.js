import React, {Component} from 'react';
import { FlatList, Text, View} from 'react-native';
import {connect} from 'redux';

class TaskList extends Component {
    
    render() {
      const {tasks} = this.props;
        return (
          <View>
         <FlatList
          data={tasks}
          renderItem={({item}) => <Text>{item.name}</Text>}
          keyExtractor={(item)=> item.id}
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
