import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../reducers';

class Task extends Component {
    
    render() {
        return (
          <Provider store={createStore(reducers)}>
          <View>
          </View>
          </Provider>
       
        );
      }
}

export default Task;
