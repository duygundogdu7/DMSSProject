import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Banner extends Component {
  render() {
    return (
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}> {this.props.text} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: 'auto',
    height: 370,
    backgroundColor: '#0A4D21',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerText: {
    fontSize: 34,
    color: '#fff'

  }
});

export default Banner;