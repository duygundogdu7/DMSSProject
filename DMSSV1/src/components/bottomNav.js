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
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'score-table',
      icon: 'movie',
      label: 'Score Table',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'music-note',
      label: 'Profile',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'portfolio',
      icon: 'music-note',
      label: 'Portfolio',
      barColor: '#E64D45',
      pressColor: 'rgba(255, 255, 255, 0.16)'
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