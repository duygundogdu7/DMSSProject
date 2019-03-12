import { View } from 'react-native';
import React, { Component } from 'react';
import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';
class ButtomNav extends React.Component  {
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
  render() {
    return (
      <View>
        <BottomNavigation
          renderTab={this.renderTab}
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
export default ButtomNav;