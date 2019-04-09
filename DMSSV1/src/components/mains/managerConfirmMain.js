import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import ManagerConfirm from '../managerConfirm';
import BottomNav from '../bottomNav'
export default class ManagerConfirmMain extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
          <ManagerConfirm/>
      </View>
      <BottomNav/>
    </View>
    )
  }
}
