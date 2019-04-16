import React, { Component } from 'react'
import { View, Text, Button, FlatList, 
        StyleSheet, TouchableHighlight,
        TouchableWithoutFeedback,
        TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {fetchAllTasks} from '../actions'



class Task extends Component {
  _onItemClicked = (item) =>{
    Actions.TaskDetail({
      task: item
    });
  }

  onButtonClicked(){
    Actions.TaskDetail({
      task: item
    });
    }
  
  onNewTaskClicked(){
    Actions.NewTask();
  }
  componentDidMount(){
    this.props.fetchAllTasks();
  }


    renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => this._onItemClicked(item)}>
        <ListItem
          title={item.title}
          subtitle={item.date}
          leftAvatar={{ source: {uri: "https://img.icons8.com/dusk/64/000000/task.png"}}}
          rightElement={item.type}
        />
        </TouchableOpacity>
      )

  render() {
      const { tasks } = this.props;
    return( 
      <View>
          <View>
            <Text style={styles.textWrapper}>YAPILMASI GEREKENLER</Text>
            <FlatList
            data={tasks}
             renderItem={this.renderItem}
            />         
        </View>
        <View style={styles.viewContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onNewTaskClicked.bind(this)}>
            <Text style={styles.loginText}>YENİ GÖREV EKLE</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  var tasks = []
  for (var property in state.tasks.data) {
    tasks = state.tasks.data[property]
  }

  return {
    tasks  
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
  }
})

export default connect(mapStateToProps, {
  fetchAllTasks
})(Task)



