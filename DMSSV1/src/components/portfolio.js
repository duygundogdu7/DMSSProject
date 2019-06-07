import React, { Component } from 'react'
import { View, Text, Picker, FlatList, TouchableHighlight,ScrollView, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { Card,ButtonGroup } from 'react-native-elements';

const component1 = () => <Text>Portfolyo Ekle</Text>
const component2 = () => <Text>Fiyat Belirleme</Text>
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
      answer: '',
      selectedIndex: 0,
      status:false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  hesapla = () =>{
 
    if(this.state.status == true)
    {
      this.setState({status: false})
    }
    else
    {
      this.setState({status: true})
    }
  }
  componentDidMount(){
    //Burada URL farklı olacak.
    axios.get("http://192.168.1.26:8086/regions", { 
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

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  

  render() {
    const buttons = [{ element: component1 }, { element: component2 }]
    const { selectedIndex } = this.state
    return (
      <View style={styles.container}>
        <ScrollView >
        <Text style={styles.textWrapper}>PORTFÖY ARAÇLARI</Text>

        <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50}} />
  
          <Card>
          <View style={{backgroundColor: '#FFFFFF'}}>
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
             
            </View>
          </View>
          </View>
          <View style={styles.highlight}>
                <TouchableHighlight style={[styles.buttonContainer2, styles.loginButton]} onPress={this.hesapla.bind(this)}>
                  <Text style={styles.loginText}>Kaydet</Text>
                </TouchableHighlight>
              </View>
            
            {        this.state.status ? <Text style= {{ fontSize: 25, color: "#000", textAlign: 'center' }}> 375000 </Text> : null
}
           
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
  textWrapper: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000'
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
    marginLeft: 20
  },
  buttonContainer: {
    height:45,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginRight: 40,
    marginLeft: 25,
    borderRadius: 15
  },
  buttonContainer2: {
    height:45,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginLeft: 60,
    borderRadius: 15
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