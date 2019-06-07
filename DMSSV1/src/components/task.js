import React, { Component } from 'react'
import { View, Text, Button, FlatList, 
        StyleSheet, TouchableHighlight,
        TouchableWithoutFeedback,
        TouchableOpacity,ScrollView ,Image} from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import {fetchAllTasks} from '../actions'
import { Card } from 'react-native-elements';



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
        <Text>Hiç görevin bulunmamaktadır.</Text>
      )
      )

  render() {
      const { tasks } = this.props;
      console.log("KİMİN INFOSU BU")
      console.log("INFO",this.props)
      console.log("tasks",tasks.results)
      console.log("name",tasks.name)
    return( 
      <ScrollView>
        <View style={styles.container}>
        <Card >
        <Image  style={styles.avatar}  source={require('./gift.jpeg')} />

        <Text style={styles.rankingWrapper2}>Merhaba {tasks.name}!</Text>
        <Text style={styles.rankingWrapper}>Bu hafta {tasks.score} puanla {tasks.rank}. sıradasınız!</Text>
        <Text style={styles.rankingWrapper}>Birinci olmak için {tasks.count} görev daha tamamlamalısın.</Text>
        </Card>
      <Card>
        <View>
            <Text style={styles.textWrapper}>YAPILMASI GEREKENLER</Text>
            <FlatList
            data={tasks.results}
             renderItem={this.renderItem}
            />         
        </View>
        
        <View style={styles.viewContainer}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onNewTaskClicked.bind(this)}>
            <Text style={styles.loginText}>YENİ GÖREV EKLE</Text>
          </TouchableHighlight>
        </View>  
      </Card>        
      </View>
      </ScrollView>
      
    )
  }
}

const mapStateToProps = state => {
  console.log("taska geld,", state.tasks.data)
  var tasks = []
  for (var property in state.tasks.data) {
    tasks = state.tasks.data[property]
  }

  console.log("gittin",tasks)
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
    marginLeft: 35
  },
  rankingWrapper: {
    fontSize: 18,
    textAlign:'center',
    color: '#000000',
    fontFamily: 'sans-serif',
    marginBottom: 10,
  },
  rankingWrapper2: {
    fontSize: 22,
    textAlign:'center',
    color: '#00b5ec',
    fontWeight:'bold',
    fontFamily: 'sans-serif',
    marginBottom: 10,
    marginTop: 200,
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
  },
  avatar: {
    alignSelf:'center',
    position: 'absolute',
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "white"
  },
})

export default connect(mapStateToProps, {
  fetchAllTasks
})(Task)



