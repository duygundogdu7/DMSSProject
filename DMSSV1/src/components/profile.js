import { Button, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {getProfile} from '../actions'	
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-elements';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from 'react-native';

class Profile extends Component {
  componentDidMount(){
    this.props.getProfile(this.props.id);
  }

  onButtonClicked(){
    Actions.Login()
  }

  renderItem = ({ item }) => (
    <ListItem
      title={
        <View>
            <Text style={styles.titleWrapper}>{item.name}</Text>
        </View>
        
      }
      rightElement = {
        <View>
            <Text style={styles.subtitleWrapper}>{item.score}</Text>
        </View>
      }
    />
  )

  render() {
    const { profile } = this.props;
    console.log("PROFILE:" ,profile)
    return(

      <View>
          <ScrollView>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: profile.imageURL}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.info}>Takım Liderin: {profile.manager}</Text>
              </View>
        </View>
        
        <Card title="Bu Haftaki Takımın">
        <View style={styles.flatlistStyle}>      
          <FlatList
          data={profile.friends}
          renderItem={this.renderItem}
        />     
        </View>
        </Card>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onButtonClicked.bind(this)}>
          <Text style={styles.loginText}>Çıkış Yap</Text>
        </TouchableHighlight>
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
    profile,
    id:state.id
  }
}

const styles = StyleSheet.create({
  textWrapper: {
     fontSize: 16,
     marginLeft: 15
   },
   errorText: {
     color: 'red',
     fontSize: 20,
     paddingTop: 5,
     alignSelf: 'center'
   },
   header:{
    backgroundColor: "#00b5ec",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:100,
    alignSelf:'center',
    marginTop:20,
    position: 'absolute',
    marginLeft: 60,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    marginTop: 100,
  },
  body:{
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:18,
    color: "#00b5ec",
    marginTop:10
  },
  description:{
    fontSize:24,
    color: "#696969",
    marginTop:20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop:40,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
    marginLeft: 60,
  },
  
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  titleWrapper: {
    fontSize: 18
  },
  subtitleWrapper: {
    fontSize: 16
  }
})

export default connect(mapStateToProps, {getProfile})(Profile);

