import { View } from 'react-native';
import React, { Component } from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
import { Actions } from 'react-native-router-flux';
class BottomNav extends React.Component  {
  state = {
    activeTab: 'task'
  }
  tabs = [
    {
      key: 'task',
      icon: 'gamepad-variant',
      label: 'Görevler',
      barColor: '#c90202',
      pressColor: '#c90202'
    },
    {
      key: 'score-table',
      icon: 'movie',
      label: 'Puan Tablosu',
      barColor: '#c90202',
      pressColor: '#c90202'
    },
    {
      key: 'profile',
      icon: 'music-note',
      label: 'Sayfam',
      barColor: '#c90202',
      pressColor: '#c90202'
    },
    {
      key: 'portfolio',
      icon: 'music-note',
      label: 'Potfolyo Hesaplama',
      barColor: '#c90202',
      pressColor: '#c90202'
    }
  ]
  handleTabPress = (newTab) => {
    console.log(newTab.key)
    switch (newTab.key) {
      case "task":
        Actions.main();
        break;
      case "score-table":
        Actions.main2();
        break;
      case "profile":
        Actions.main3({userID: '1235'});
        break;
      case "portfolio":
        Actions.main4();
        break;
   }
  }
  render() {
    return (
      <View>
        <BottomNavigation
          renderTab={this.renderTab}
          onTabPress={this.handleTabPress}
          tabs={this.tabs}
        />
      </View>
    )
  }
  renderTab = ({ tab, isActive }) => {
    return (
      <FullTab
        key={tab.key}
        isActive={isActive}
        label={tab.label}
        renderIcon={this.renderIcon}
      />
    )
  }

  renderIcon = ({ isActive }) => {
    return <View />
  }
}
export default BottomNav;