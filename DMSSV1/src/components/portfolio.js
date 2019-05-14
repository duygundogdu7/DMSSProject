import React, { Component } from 'react'
import { View, Text, Picker, FlatList, TouchableHighlight,ScrollView, StyleSheet } from 'react-native';
import { Input,Button } from 'react-native-elements';
import axios from 'axios';

 class Portfolio extends Component {
  
  constructor(){
    super();
    this.state = {
      bolge: '',
      yapili: '',
      esyali: '',
      userTypes: [{userType: 'admin', userName: 'Admin User'}, {userType: 'employee', userName: 'Employee User'}, {userType: 'dev', userName: 'Developer User'}],
      selectedUserType: '',
      bolgeler: []
    }
  }

  componentDidMount(){
    //Burada URL farklı olacak.
    axios.get("http://192.168.43.165:8086/regions", { 
      params: {}
    }).then(result =>{
      console.log("Bölgelerimiz")
      console.log(result.data.regions)
      this.setState({
        bolgeler:result.data.regions
      })
      console.log(this.state.bolgeler)
    })
  }
  

  loadUserTypes() {
    return this.state.userTypes.map(user => (
       <Picker.Item label={user.userName} value={user.userType} />
    ))
  }

  loadRegions(){
    return this.state.bolgeler.map(bolge => (
      <Picker.Item label={bolge.label} value={bolge.value}/>
    ))
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.portfolioStyle}>
            <View style={styles.portfolioStyle}>
              <Text style={styles.textStyle}>Bölge:</Text>
              <Picker
              selectedValue={this.state.bolge}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  {
                this.setState({selectedUserType: itemValue})
              }}>

              {this.loadRegions()}

              </Picker>

              <Text style={styles.textStyle}>Yapılı:</Text>
              <Picker
              selectedValue={this.state.yapili}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({yapili: itemValue})}>
              <Picker.Item label="Evet" value="evet" />
              <Picker.Item label="Hayır" value="hayir" />
              <Picker.Item label="Boş" value="bos" />
              </Picker>

              <Text style={styles.textStyle}>Eşyalı:</Text>
              <Picker
              selectedValue={this.state.esyali}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({esyali: itemValue})}>
              <Picker.Item label="Evet" value="evet" />
              <Picker.Item label="Hayır" value="hayir" />
              <Picker.Item label="Boş" value="bos" />
              </Picker>

              <Input placeholder="m2"/>
              <Input placeholder="Kat Sayısı"/>
              <Input placeholder="Bulunan Kat"/>
              <Input placeholder="Aidat"/>

              

              <View style={styles.highlight}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}>
                  <Text style={styles.loginText}>Hesapla</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
       </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  portfolioStyle:{
    marginTop: 30
  },
  highlight:{
    marginTop: 20,
    marginLeft: 80
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  textStyle: {
    fontSize: 20
  }
});

export default Portfolio;