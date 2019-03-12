
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Banner from './src/components/banner';
import LoginForm from './src/components/loginForm';
import ButtomNav from './src/components/buttomNav';

class App extends Component {
  render() {
    return (
    <View>
      <View>
        <Banner text='HOŞGELDİNİZ'/>
        <LoginForm/>
        
      </View>
      <View>
        <ButtomNav/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height:40,
    paddingTop:30,
    shadowColor:'#000000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.3,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container:{

    flex:1,
    flexDirection:'column'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',

  },
  headerText:{
    fontSize:20,
    textAlign:'center'
  }

});
export default App;
