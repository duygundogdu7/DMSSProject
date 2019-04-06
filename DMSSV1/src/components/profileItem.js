import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ProfileItem extends Component {
    render(){
        const {profile} = this.props;
        return (
            <View>
              <Text style={styles.titleStyle}>SCORE</Text>
              <Text style={styles.titleStyle}>{profile.score}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
      fontSize: 16,
      color: 'black'
    },
  })


  export default ProfileItem;
