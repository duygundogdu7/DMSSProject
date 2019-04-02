import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import profile from '../profile';
import BottomNav from '../bottomNav'
export default class profileMain extends Component {
  render() {
    return (
        <View>
        <profile/>
        <BottomNav/>
     </View>
    )
  }
}

