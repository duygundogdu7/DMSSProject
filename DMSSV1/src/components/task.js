import React, { Component } from 'react'
import { View, Text, Button, FlatList, 
        StyleSheet, TouchableHighlight,
        TouchableWithoutFeedback,
        TouchableOpacity,ScrollView } from 'react-native';
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
    this.props.fetchAllTasks(this.props.id);
  }


    renderItem = ({ item }) => (
      item ? (
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
      ) : (
        <Text>You have no tasks.</Text>
      )
      )

  render() {
      const { tasks } = this.props;
    return( 
      <ScrollView>
        <View style={styles.container}>
        
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
      </ScrollView>
      
    )
  }
}

const mapStateToProps = state => {
  var tasks = []
  for (var property in state.tasks.data) {
    tasks = state.tasks.data[property]
  }

  return {
    tasks,
    id:state.id
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: 1000
  },
  viewContainer: {
    marginTop: 20,
    justifyContent: 'center'
  },
  textWrapper: {
     marginTop: 20,
     marginBottom: 20,
     fontSize: 24,
     textAlign: 'center',
     fontWeight: 'bold',
     color: '#000000'
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
  fetchAllTasks
})(Task)



