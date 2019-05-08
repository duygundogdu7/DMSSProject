import React, { Component } from 'react'
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

 class Portfolio extends Component {
  render() {
    return (
     <View style={styles.portfolioStyle}>
       <Input placeholder='Konum'/>
       <Input placeholder='Bölüm'/>
       <Input placeholder='Fiyat'/>
       <View style={styles.highlight}>
       <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
          <Text style={styles.loginText}>Hesapla</Text>
        </TouchableHighlight>
       </View>
       
       </View>
    )
  }
}

const styles = StyleSheet.create({
  portfolioStyle:{
    marginTop: 30
  },
  highlight:{
    marginTop: 20,
    marginLeft: 80
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default Portfolio;