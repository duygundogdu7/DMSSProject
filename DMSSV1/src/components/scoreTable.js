import _ from 'lodash';
import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import {fetchScoreTable} from '../actions'

class ScoreTable extends Component {
  componentDidMount(){
    this.props.fetchScoreTable();
  }
    renderItem = ({ item }) => (
        <ListItem
          title={item.scoreTable}
        />
      )

      render() {
        console.log("scoreTable render")
        console.log(this.props)
        const {scoreTable} = this.props;
          return (
            <View>
           <FlatList
            data={scoreTable}
            renderItem={this.renderItem}
              />
            </View>
         
          );
        }
}

const mapStateToProps = state => {
  console.log("msp")
  const scoreTable = _.map(state.scoreTable, (val) => {
    return { ...val}
  });
  
  console.log(scoreTable)
  return {
    scoreTable
  }
}


export default connect(mapStateToProps, {
  fetchScoreTable
})(ScoreTable);

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