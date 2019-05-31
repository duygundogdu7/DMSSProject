import React, { Component } from 'react'
import { View, Text, Button, FlatList, 
        StyleSheet, TouchableHighlight,
        TouchableWithoutFeedback,
        TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {fetchAllManagerTasks} from '../actions'



class Approval extends Component {
  _onItemClicked = (item) =>{
    Actions.ApprovalDetail({
      task: item
    });
  }
  componentDidMount(){
    this.props.fetchAllManagerTasks(this.props.id);
  }


    renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this._onItemClicked(item)}>
        <ListItem
          title={
            <View>
                <Text style={styles.titleWrapper}>{item.title}</Text>
            </View>
            
          }
          subtitle={
            <View>
                <Text style={styles.subtitleWrapper}>{item.date}</Text>
            </View>
          }
          leftAvatar={{ source: {uri: "https://img.icons8.com/dusk/64/000000/task.png"}}}
          rightElement={
            <View>
                <Text style={styles.subtitleWrapper}>{item.type}</Text>
            </View>
          }

        />
        </TouchableOpacity>
      )

  render() {
      const { manTasks } = this.props;
    return( 
      <View>
          <View>
            <Text style={styles.textWrapper}>ONAYLANILMASI GEREKENLER</Text>
            <FlatList
            data={manTasks}
            renderItem={this.renderItem}
            />         
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  var manTasks = []
  for (var property in state.manTasks.data) {
    manTasks = state.manTasks.data[property]
  }

  return {
    manTasks,
    id:state.id
  }

}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 20,
     textAlign: 'center',
     fontWeight: 'bold'
   },
   buttonContainer: {
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
  },
  titleWrapper: {
    fontSize: 18
},
subtitleWrapper: {
    fontSize: 16
}
})

export default connect(mapStateToProps, {
  fetchAllManagerTasks
})(Approval)



