import React, { Component } from 'react';
import { TextInput } from 'react-native';
import Confetti from 'react-native-confetti';

class ConfettiPage extends Component {
 
 componentWillMount(){
    this._confettiView.startConfetti();
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
        <Confetti ref={(node) => this._confettiView = node}/>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton3]} onPress={this.onCompleteClicked.bind(this)}>
            <Text style={styles.loginText}>Geri Dön</Text>
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
       marginTop: 20,
       marginBottom: 20,
       fontSize: 20,
       textAlign: 'center',
       fontWeight: 'bold'
     },
     buttonContainer: {
      marginTop: 20,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      width:150,
      marginLeft: 70
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    },
    loginButton2: {
      backgroundColor: "#cc0828",
    },
    loginButton3: {
      backgroundColor: "#00e600",
    },
    loginText2: {
      color: 'white',
    }
  })
  

  const mapStateToProps = state => {
    return{
      manager: state.manager
    }
  }

  
export default connect(mapStateToProps)(ConfettiPage);