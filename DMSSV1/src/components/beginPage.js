import React, { Component } from 'react';
import { View, Image,StyleSheet,Text } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class BeginPage extends Component {
  render() {
    return (
      <View style={styles.back}>
        <Image
          source={require('../images/kwlogo.png')}
        />
       <Image
          source={require('../images/red.png')}
        />
        <Text style={styles.textStyle}>   Keller Williams is the world's largest real estate franchise by agent count, has more than 1,000 offices and 180,000 associates. The franchise is also No. 1 in units and sales volume in the United States.
            </Text>    

        <Text style={styles.textStyle2} onPress={() => Actions.Login() }>Start</Text>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
    back:{
        backgroundColor: '#FFFFFF' 
        },
    textStyle: {
        marginTop: 50,
        marginBottom: 250,
        fontSize: 20,
        fontStyle: 'italic'
    },
    textStyle2: {
        marginBottom: 20,
        fontSize: 20,
        fontStyle: 'italic',
        color: "#bf0000",
        marginLeft:350
    }
  });
