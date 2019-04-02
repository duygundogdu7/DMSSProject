import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import portfolio from '../portfolio';
import BottomNav from '../bottomNav'
export default class portfolioMain extends Component {
  render() {
    return (
        <View>
            <portfolio/>
            <BottomNav/>
     </View>
    )
  }
}
