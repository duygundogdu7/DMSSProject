import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
 class Portfolio extends Component {
  render() {
    return (
     <View>
       <Text>Konum:</Text>
       <Input></Input>
       <Text>Bölüm:</Text>
       <Input></Input>
       <Text>Fiyat:</Text>
       <Input></Input>
     </View>
    )
  }
}
export default Portfolio;