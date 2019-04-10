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
      label: 'Task',
      barColor: '#00b5ec',
      pressColor: '#00b5ec'
    },
    {
      key: 'score-table',
      icon: 'movie',
      label: 'Score Table',
      barColor: '#00b5ec',
      pressColor: '#00b5ec'
    },
    {
      key: 'profile',
      icon: 'music-note',
      label: 'Profile',
      barColor: '#00b5ec',
      pressColor: '#00b5ec'
    },
    {
      key: 'portfolio',
      icon: 'music-note',
      label: 'Portfolio',
      barColor: '#00b5ec',
      pressColor: '#00b5ec'
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
        Actions.main3();
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