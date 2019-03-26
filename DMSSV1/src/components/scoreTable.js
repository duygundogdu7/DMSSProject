import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';


class ScoreTable extends Component {
 
    renderItem = ({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.subtitle}
          leftAvatar={{
            source: item.avatar_url && { uri: item.avatar_url },
            title: item.name[0]
          }}
        />
      )

  render() {
      const { scoreMembers } = this.props;
    return(
        <View>
            
            <FlatList
            data={scoreMembers}
             renderItem={this.renderItem}
            />     
             
      </View>
    
    )
  }
}

const mapStateToProps = state => {
    return {
        scoreMembers: state.scoreMembers
    }
}

export default connect(mapStateToProps)(ScoreTable);


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