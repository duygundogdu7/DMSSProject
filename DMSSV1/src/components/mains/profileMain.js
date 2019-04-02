import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import Profile from '../profile';
import BottomNav from '../bottomNav'
export default class ProfileMain extends Component {
  render() {
    return (
        <View>
        <Profile/>
        <BottomNav/>
     </View>
    )
  }
}

