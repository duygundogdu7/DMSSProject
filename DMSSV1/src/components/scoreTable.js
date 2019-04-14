import React, { Component } from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import { ListItem } from 'react-native-elements';
import {fetchScoreTable} from '../actions'

class ScoreRoute extends Component {
  componentDidMount(){	
    this.props.fetchScoreTable();	
 }

    renderItem = ({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.artist}
          leftAvatar={{ source: {uri: item.source}}}
          rightElement={item.score}

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
    scoreTable
  }
}


const styles = StyleSheet.create({
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 20,
     textAlign: 'center',
     fontWeight: 'bold'
   },
})

export default connect(mapStateToProps, {fetchScoreTable})(ScoreRoute);

//Team Members databaseden bir list olarak gelecek. 
//Team Leader da aynı şekilde


