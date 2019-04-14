import React, { Component } from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { connect, Provider } from 'react-redux';
import { ListItem } from 'react-native-elements';

class ScoreRoute extends Component {
 
    renderItem = ({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.artist}
          leftAvatar={{ source: {uri: item.source}}}
          rightElement={item.id}

        />
      )

  render() {
      const { scores } = this.props;
    return(
        <View>
          <Text style={styles.textWrapper}>HAFTALIK PUAN TABLOSU</Text>
            <FlatList
            data={scores}
             renderItem={this.renderItem}
            />          
        </View>
    )
  }
}

const mapStateToProps = state => {
    return {
        scores: state.scores
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

export default connect(mapStateToProps)(ScoreRoute);


//Team Members databaseden bir list olarak gelecek. 
//Team Leader da aynı şekilde


