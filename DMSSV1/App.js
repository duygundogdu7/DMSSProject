import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import reducers from './src/reducers';
import { createStore, applyMiddleware } from 'redux';	
import ReduxThunk from 'redux-thunk';	
import { Provider } from 'react-redux';
import Main from './src/Main';
import {
  StyleSheet,
  View
} from 'react-native';


export default class MyComponent extends React.Component {


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Main />
        </View>      
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f9f9f9'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/*  */

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
