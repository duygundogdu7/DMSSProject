import { Button, FlatList, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {getProfile} from '../actions'	
import { Actions } from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
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
      title={item.name}
      subtitle={item.isbn}
      rightElement = {item.score}
    />
  )

  render() {
    const { profile } = this.props;
    return(

      <View>
          <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.info}>Takım Liderin: {profile.manager}</Text>
              <Text style={styles.description}>BU HAFTAKİ TAKIMIM</Text>
              </View>
          </View>
        </View>
        
        <View style={styles.flatlistStyle}>      
          <FlatList
          data={profile.friends}
          renderItem={this.renderItem}
        />     
        </View>
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
     marginTop: 20,
     fontSize: 16,
     marginLeft: 15
   },
   flatlistStyle:{
     
   },
   errorText: {
     color: 'red',
     fontSize: 20,
     paddingTop: 5,
     alignSelf: 'center'
   },
   header:{
    backgroundColor: "#00b5ec",
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
    color: "#00b5ec",
    marginTop:10
  },
  description:{
    fontSize:20,
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
  },
  buttonContainer: {
    marginTop: 20,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    marginLeft: 80
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
})

export default connect(mapStateToProps, {getProfile})(Profile);

