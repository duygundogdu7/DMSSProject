import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import {Input} from 'react-native-elements';
 class Portfolio extends Component {
  render() {
    return (
     <View>
       <Text>Konum:</Text>
       <Input placeholder = "EXAMPLE"/>
       <Text>Bölüm:</Text>
       <Input placeholder = "EXAMPLE"/>
       <Text>Fiyat:</Text>
       <Input placeholder = "EXAMPLE"/>
       <Text>Example</Text>
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