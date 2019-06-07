import React, { Component } from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import { ListItem } from 'react-native-elements';
import {fetchScoreTable} from '../actions'
import axios from 'axios';
class ScoreRoute extends Component {

  state = {
    ranking: '',
  }

  componentDidMount(){	
    //console.log("KULLANICININ ID'Si");
    //console.log(this.props.id);

    this.props.fetchScoreTable();	
    console.log("idn")
    console.log(this.props.id)
    axios({
      method: 'get',
      url: 'http://192.168.0.12:8086/ranking',
      data: {
          id: this.props.id
      }
     }).then((response) =>
    { console.log("SIRALAMAN: ")
      console.log(response.data.rank)
      this.setState({
        ranking: response.data.rank
     }) 
  }).catch(error => {console.log(error)})
}

    renderItem = ({ item }) => (
        <ListItem 
          title={
            <View>
                <Text style={styles.titleWrapper}>{item.name}</Text>
            </View>
          }
          subtitle={
            <View>
                <Text style={styles.subtitleWrapper}>{item.artist}</Text>
            </View>
          }
          leftAvatar={{ source: {uri: item.imageURL}}}
          rightElement={
            <View>
                <Text style={styles.subtitleWrapper}>{item.score + " PUAN"}</Text>
            </View>
          }

        />
      )

  render() {
    console.log("st render")
    console.log(this.props)
      const { scoreTable } = this.props;
    return(
        <View style={styles.container}>
          <Text style={styles.textWrapper}>HAFTALIK PUAN TABLOSU</Text>
          <Text style={styles.rankingWrapper}>Bu hafta {this.state.ranking}. sıradasınız!</Text>
          <FlatList
            data={scoreTable}
             renderItem={this.renderItem}
            /> 
       
         
        </View>
    )
  }
}

const mapStateToProps = state => {
  var scoreTable = []
  for (var property in state.scoreTable.data) {
    scoreTable = state.scoreTable.data[property]
  }	
  return {
    scoreTable,
    id:state.id
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: 1000
  },
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 24,
     textAlign: 'center',
     fontWeight: 'bold',
     color: '#000000'
   },
   titleWrapper: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
},
subtitleWrapper: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'

},
rankingWrapper: {
  fontSize: 18,
  textAlign:'center',
  color: '#00b5ec',
  fontWeight:'bold',
  fontFamily: 'sans-serif',
  marginBottom: 10,
}
})

export default connect(mapStateToProps, {fetchScoreTable})(ScoreRoute);

//Team Members databaseden bir list olarak gelecek. 
//Team Leader da aynı şekilde


