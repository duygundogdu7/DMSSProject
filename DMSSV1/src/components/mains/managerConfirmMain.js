import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import managerConfirm from '../managerConfirm';
import BottomNav from '../bottomNav'
export default class managerConfirmMain extends Component {
  render() {
    return (
        <View>
        <managerConfirm/>
        <BottomNav/>
 </View>
    )
  }
}
