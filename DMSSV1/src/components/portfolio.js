import React, { Component } from 'react'
import { View, Text, Picker, FlatList, TouchableHighlight,ScrollView, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';


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
      aidat: '',
      answer: ''
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
    axios({
      method: 'get',
      url: 'http://192.168.43.165:8086/analyze',
      data: {
        "region": this.state.bolge,
        "type": this.state.durum,
        "yapili":this.state.yapili,
        "esyali":this.state.esyali,
        "m2": this.state.m2,
        "katSayisi": this.state.katSayisi,
        "bulKat": this.state.bulunanKat,
        "aidat": this.state.aidat,
        
      }
     }).then((response) => 
     //Burada dairemizin fiyatının yazması lazım.
    { console.log(response)
     })  
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <Card title="PORTFÖY HESAPLAMA ARACI" >
          <View style={{backgroundColor: '#E0FFFF'}}>
          <View style={styles.portfolioStyle}>
            <View style={styles.portfolioStyle}>
              <Picker
              selectedValue={this.state.bolge}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  {
                this.setState({bolge: itemValue})
              }}>
              <Picker.Item label="Bölge Seçiniz" value='0'/>

              {this.loadRegions()}
              </Picker>
              <Picker
              selectedValue={this.state.type}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  {
                this.setState({type: itemValue})
              }}>
               <Picker.Item label="Durum Seçiniz" value='0'/>
              {this.loadTypes()}
              </Picker>
              <Picker
              selectedValue={this.state.yapili}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({yapili: itemValue})}>
             <Picker.Item label="Yapılı mı?" value='0'/>
              <Picker.Item label="Evet" value="evet" />
              <Picker.Item label="Hayır" value="hayir" />
              </Picker>

              <Picker
              selectedValue={this.state.esyali}
              style={{height: 70, width: 200}}
              onValueChange={(itemValue, itemIndex) =>  this.setState({esyali: itemValue})}>
              <Picker.Item label="Eşyalı mı?" value='0'/>
              <Picker.Item label="Evet" value="evet" />
              <Picker.Item label="Hayır" value="hayir" />
              </Picker>

              <TextInput 
              style={styles.textInput}
              placeholder="m2"
              placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(m2) => this.setState({m2})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Kat Sayısı"
              placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(katSayisi) => this.setState({katSayisi})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Bulunduğu Kat"
              placeholderTextColor="black"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(bulunanKat) => this.setState({bulunanKat})}/>

              <TextInput 
              style={styles.textInput}
              placeholder="Aidat"
              placeholderTextColor="black"
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
          </View>
          </Card>
       </ScrollView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput:{
    height: 70,
    color: 'black',
    borderColor: 'black',
    borderWidth: 0.5,
  },
  portfolioStyle:{
    marginTop: 5
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
    marginRight: 60,
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