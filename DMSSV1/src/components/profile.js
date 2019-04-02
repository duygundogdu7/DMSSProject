import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

class Profile extends Component {
 
  render() {
      const { members } = this.props;
    return(
        <View>
            <Text>Team Leader: </Text>
            <Text>Gözde Özçelik</Text>
            <Text>Team Members:</Text>
            <FlatList
            data={members}
             renderItem={({item}) => <Text>{item.title}</Text>}
            />     
             <Button title="Logout" color="#841584"/>  
      </View>
    
    )
  }
}

const mapStateToProps = state => {
    return {
        members: state.members
    }
}

export default connect(mapStateToProps)(Profile);


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