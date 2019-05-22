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
      bolgeler: [],
      type: '',
      m2: '',
      katSayisi: '',
      bulunanKat: '',
      aidat: ''
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
      <Picker.Item label={bolge.region} value={bolge.region}/>
    ))
  }

  loadTypes(){
    return this.state.bolgeler.map(bolge => (
      <Picker.Item label={bolge.type} value={bolge.type}/>
    ))
  }

  hesapla(){
    //Burada bir tane GET methodu olacak. Parametre olarak da bolge,aidat vs. göndereceğiz.
    console.log(this.state.m2)
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
                this.setState({bolge: itemValue})
              }}>

              {this.loadRegions()}
              </Picker>
              <Text style={styles.textStyle}>Durum:</Text>
              <Picker
              selectedValue={this.state.type}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  {
                this.setState({type: itemValue})
              }}>

              {this.loadTypes()}
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

              <TextInput 
              style={styles.textInput}
              placeholder="m2"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(m2) => this.setState({m2})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Kat Sayısı"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(katSayisi) => this.setState({katSayisi})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Bulunan Kat"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(bulunanKat) => this.setState({bulunanKat})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Aidat"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(aidat) => this.setState({aidat})}/>

              

              

              <View style={styles.highlight}>
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.hesapla.bind(this)}>
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
  textInput:{
    fontSize: 20
  },
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