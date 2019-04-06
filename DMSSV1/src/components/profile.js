import _ from 'lodash';
import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {getProfile} from '../actions'
import ProfileItem from './profileItem';


class Profile extends Component {
  componentDidMount(){
    this.props.getProfile();
  }

  renderItem = ({item}) => {
    return (
      <ProfileItem profile={item}/>
    );
  }

  render() {
      const { profile } = this.props;
      console.log("okeyiz");
      console.log(profile);
    return(
        <View>
          <FlatList
          data={profile}
          renderItem={this.renderItem}
            />
             
      </View>
    
    )
  }
}


const mapStateToProps = state => {
  console.log("msp")
  const profile = _.map(state.profile, (val) => {
    return { ...val}
  });
  
  console.log(profile)
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