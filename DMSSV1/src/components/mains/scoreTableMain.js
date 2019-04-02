import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import scoreTable from '../scoreTable';
import BottomNav from '../bottomNav'
export default class scoreTableMain extends Component {
  render() {
    return (
        <View>
           <scoreTable/>
           <BottomNav/>
        </View>
    )
  }
}



