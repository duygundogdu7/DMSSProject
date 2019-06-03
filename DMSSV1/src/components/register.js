import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  PixelRatio,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'


function uploadFile(file) {
  console.log("UPLOAD FILE", file)
  return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/' + 'dedbcikez' + '/image/upload?upload_preset=' + 'yuhlmri1', {
      'Content-Type': 'multipart/form-data'
  }, [
          { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(file.uri) }
      ])
}
export default class LoginView extends Component {

  state = {
    name:'',
    surname:'',
    email:'',
    password:'',
    passwordAgain: '',
    registerResponse:'',
    error: '',
    loading:false,
    avatarSource: null,
    uploadingImg: false,
  }
  
  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

      
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
                this.setState({
                    uploadingImg: true
                });
                uploadFile(response)
                    .then(response => response.json())
                    .then(result => {
                        this.setState({
                            avatarSource: { uri: result.secure_url },
                            uploadingImg: false
                        });
                    })

      }
    });
  }
  onRegisterPressed(){
    this.setState({error: '', loading:true})
    if(this.state.email == " " || this.state.password == " " || this.state.name == " " || this.state.surname == " "){
      this.setState({
        error: 'Lütfen boşlukları doldurunuz.',
        loading: true
      })
      return
    }
    if(this.state.email.split('@')[1] != "kw.com"){
      this.setState({
        error: 'Keller Williams emailiniz ile kaydolunuz.',
        loading: true
      })
      return
    }
    if(this.state.password != this.state.passwordAgain){
      this.setState({
        error: 'Parolanız aynı değil.',
        loading: true
      })
      return
    }
    axios({
      method: 'post',
      url: 'http://192.168.43.165:8086/register',
      data: {
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          imageURL: this.state.avatarSource.uri
      }
     }).then((response) => 
    {this.setState({
    registerResponse: response.status
  })})
    console.log(this.state.registerResponse);
    if(this.state.registerResponse == "1")
      Actions.Login();
    else{
      this.setState({
        error: 'Kayıt olurken hata oluştu!',
        loading: false
      })
     
    }


  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
     
            {this.state.avatarSource === null ? (
              <Text>Profil Resminizi Seçiniz</Text>
            ) : (
              <Image style={styles.avatar} source={this.state.avatarSource} />
            )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Adınız"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}/>
        </View>
      <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Soyadınız"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(surname) => this.setState({surname})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Emailiniz"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Şifreniz"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Şifrenizi Tekrar Giriniz"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({passwordAgain:password})}/>
        </View>
        
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onRegisterPressed.bind(this)}>
          <Text style={styles.loginText}>Kayıt Ol</Text>
        </TouchableHighlight>
        </ScrollView> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
      borderBottomColor: '#000000',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
      
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      fontSize: 16
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  avatarContainer: {
    borderColor: '#00b5ec',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 50,
    borderRadius:75,
    borderWidth: 1,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },

});