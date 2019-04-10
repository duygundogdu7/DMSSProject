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
export default Portfolio;