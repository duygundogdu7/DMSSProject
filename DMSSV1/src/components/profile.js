import React, { Component } from 'react'
import { View, Text, Button, FlatList,StyleSheet,Image, ScrollView } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.info}>Keller Williams Consultant</Text>
            <Text style={styles.description}></Text>
            </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.flatlistStyle}>      
          <FlatList
          data={profile.friends}
          renderItem={this.renderItem}
        />     
        </View>
      </ScrollView>
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


const styles = StyleSheet.create({
  textWrapper: {
     marginTop: 20,
     fontSize: 16,
     marginLeft: 15
   },
   flatlistStyle:{
     marginTop: 50,
   },
   errorText: {
     color: 'red',
     fontSize: 20,
     paddingTop: 5,
     alignSelf: 'center'
   },
   header:{
    backgroundColor: "#c90202",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#c90202",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  }
})

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