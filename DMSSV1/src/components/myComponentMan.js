import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Task from './task';
import ScoreRoute from './scoreTable';
import Profile from './profile';
import Portfolio from './portfolio';
import Approval from './approval';


export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'onay', title: 'Onay', icon: 'check' },
      { key: 'gorev', title: 'Görev', icon: 'home' },
      { key: 'puan', title: 'Puan', icon: 'format-list-numbered' },
      { key: 'sayfam', title: 'Sayfam', icon: 'person' },
      { key: 'portfoy', title: 'Portfoy', icon: 'content-paste' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    onay: Approval,
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


/* <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{backgroundColor:"#00b5ec"}}
     /> */


/* <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        barStyle={{backgroundColor:"#00b5ec"}}
      />*/
