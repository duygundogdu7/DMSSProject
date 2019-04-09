import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import ScoreTable from '../scoreTable';
import BottomNav from '../bottomNav'
export default class ScoreTableMain extends Component {
  render() {
    return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScoreTable/>
          </View>
          <BottomNav/>
        </View>
    )
  }
}



