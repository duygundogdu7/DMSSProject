import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {getProfile} from '../actions'
import { ListItem } from 'react-native-elements';



class Profile extends Component {
  componentDidMount(){
    this.props.getProfile();
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.score}
    />
  )

  render() {
      const { profile } = this.props;
      console.log(profile);
    return(
        <View>
          <Text >SCORE</Text>
          <Text >{profile.score}</Text>
          <FlatList
            data={profile.friends}
            renderItem={this.renderItem}
              />
          <Text >manager</Text>
          <Text >{profile.manager}</Text>
      </View>
    
    )
  }
}


const mapStateToProps = state => {
  var profile = []
  for (var property in state.profile.data) {
    profile[property] = state.profile.data[property]
  }
  return {
    profile
  }
}


export default connect(mapStateToProps, {
  getProfile
})(Profile);


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