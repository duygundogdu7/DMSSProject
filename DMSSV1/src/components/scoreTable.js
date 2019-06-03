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
      url: 'http://192.168.43.165:8086/ranking',
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
                <Text style={styles.subtitleWrapper}>{item.score + " puan"}</Text>
            </View>
          }

        />
      )

  render() {
    console.log("st render")
    console.log(this.props)
      const { scoreTable } = this.props;
    return(
        <View>
          <Text style={styles.textWrapper}>HAFTALIK PUAN TABLOSU</Text>
            <FlatList
            data={scoreTable}
             renderItem={this.renderItem}
            /> 
        <Text style={this.styles.subtitleWrapper}>Senin sıralaman: {this.state.ranking}.</Text>
         
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
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 24,
     textAlign: 'center',
     fontWeight: 'bold'
   },
   titleWrapper: {
    fontSize: 18
},
subtitleWrapper: {
    fontSize: 16
}
})

export default connect(mapStateToProps, {fetchScoreTable})(ScoreRoute);

//Team Members databaseden bir list olarak gelecek. 
//Team Leader da aynı şekilde


