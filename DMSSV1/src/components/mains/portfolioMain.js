import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import Portfolio from '../portfolio';
import BottomNav from '../bottomNav'
export default class PortfolioMain extends Component {
  render() {
    return (
        <View>
            <Portfolio/>
            <BottomNav/>
     </View>
    )
  }
}
