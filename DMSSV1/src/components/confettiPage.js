import React, { Component } from 'react';
import { TextInput,StyleSheet,View,TouchableHighlight,Text } from 'react-native';
import Confetti from 'react-native-confetti';
import {connect} from 'react-redux'
import { Actions } from 'react-native-router-flux';

class ConfettiPage extends Component {
 
 componentDidMount(){
  if(this._confettiView) {
    this._confettiView.startConfetti();
 }
 }

 onCompleteClicked(){
    if(this.props.manager == false)
      Actions.MyComponent();
    else  if(this.props.manager == true)
      Actions.MyComponentMan();
      
  }

  render() {
    return (
      <View>
        <Confetti ref={(node) => this._confettiView = node} />
        <Text style={styles.textWrapper}>Tebrikler yeni bir görev tamamladınız! Takım lideriniz onayladıktan sonra 10 puan kazanacaksınız!</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onCompleteClicked.bind(this)}>
            <Text style={styles.loginText}>Görev Listene Dön!</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    viewContainer: {
      marginTop: 20,
      justifyContent: 'center'
    },
    textWrapper: {
      marginTop: 150,
      marginBottom: 20,
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#000000'
    },
     buttonContainer: {
      marginTop: 50,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      width:150,
      marginLeft: 110
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    },
  })
  

  const mapStateToProps = state => {
    return{
      manager: state.manager
    }
  }

  
export default connect(mapStateToProps)(ConfettiPage);