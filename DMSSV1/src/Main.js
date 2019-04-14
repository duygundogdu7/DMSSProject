import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Router from './Router'


export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
            <Router></Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
