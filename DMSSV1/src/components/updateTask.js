import React, {Component} from 'react';
import {View,Text} from 'react-native';

class UpdateTask extends Component {
    render() {
        return (
          <View>
       <Text> {this.props.task.title} </Text>
       </View>
        )
}

}
export default UpdateTask;