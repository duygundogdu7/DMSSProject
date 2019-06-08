import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Task from './task';
import ScoreRoute from './scoreTable';
import Profile from './profile';
import Portfolio from './portfolio';


export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'gorev', title: 'Görev', icon: 'home' },
      { key: 'puan', title: 'Puan', icon: 'insert-chart' },
      { key: 'portfoy', title: 'Portfoy', icon: 'content-paste' },
      { key: 'sayfam', title: 'Sayfam', icon: 'person' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    gorev: Task,
    puan: ScoreRoute,
    portfoy: Portfolio,
    sayfam: Profile,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{backgroundColor:"#00b5ec"}}
     />
    );
  }
}
