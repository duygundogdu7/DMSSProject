import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';


export default  class ScoreTable extends Component {
 
    
  render() {
    return(
        <View>
           <Text>score-table</Text>
      </View>
    
    )
  }
}




//Team Members databaseden bir list olarak gelecek. 
//Team Leader da aynı şekilde

/*<List>
<FlatList
data={this.state.data}
renderItem={({ item }) => (
<ListItem
    roundAvatar
    title={'${item.name.first} ${item.name.last}'}
    subtitle={item.email}
     avatar={{ uri: item.picture.thumbnail }}
/>
)}
/>
</List>*/