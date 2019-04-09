import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import Portfolio from '../portfolio';
import BottomNav from '../bottomNav'
export default class PortfolioMain extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
              <Portfolio/>
          </View>
          <BottomNav/>
        </View>
    )
  }
}
