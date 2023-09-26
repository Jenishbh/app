import React, { useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Text, Alert, TouchableOpacity} from 'react-native';
//import {db} from '../../database/firebase'
import { TextInput, Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
//import { getAuth } from "firebase/auth";

export default function Profile({navigation}){
    //const auth = getAuth();
    //const user = auth.currentUser;
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    
//    useEffect(()=>{
//      db 
//      .collection('UserData').doc(user.email).get().then(DocumentSnapshot => {
//        if (DocumentSnapshot.exists){
//          const udata = DocumentSnapshot.data()
//          setUsername(udata.name)
//          setEmail(udata.email)
//          setFirstname(udata.firstName)
//          setLastname(udata.lastName)
//          setPhone(udata.phone)
//          setImgUrl(udata.imageUrl)
//        }
//      })
//    },[])

    const handleSave =() =>{

//        db
//        .collection('UserData')
//        .doc(user.email)
//        .set({
//          email: email,
//          name: username,
//          firstName: firstname,
//          lastName: lastname,
//          phone: phone,
//          imageUrl: imgUrl
//        })
        Alert.alert('Update successfully!!')

    }

    // This function is triggered when the profile image is pressed
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library 
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this appp to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setImgUrl(result.uri);
        console.log(result.uri);
      }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("You've refused to allow this appp to access your camera!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setImgUrl(result.uri);
        console.log(result.uri);
      }
    }

    return (
      <SafeAreaView style={{flex:1,backgroundColor: 'white'}}>
            <View style={styles.header}></View>
            
            <TouchableOpacity onPress={showImagePicker}>
              <Image source={ imgUrl === '' ? 
                require("../../assets/profile.png") : { uri: imgUrl }}
                style={styles.avatar}
              />
              
            </TouchableOpacity>
            <Text style={{alignSelf:'center', top:190}}>Tap Image for Change</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 180, textAlign: 'center'}}> {username}</Text>
            
            <TextInput
                style={{marginTop:20, width:'90%', alignSelf:'center'}}
                mode="outlined"
                label="Email"
                value={email}
                //onChangeText={email =>setEmail(email)}
                theme={{ colors: { primary: 'orange', placeholder: 'orange', underlineColor:'transparent', background:'white'}}}
                disabled
            />

            <TextInput
                style={{marginTop:20, width:'90%', alignSelf:'center'}}
                mode="outlined"
                label="First Name"
                value={firstname}
                onChangeText={fn =>setFirstname(fn)}
                theme={{ colors: { primary: 'orange', placeholder: 'orange', underlineColor:'transparent', background:'white'}}}
            />

            <TextInput
                style={{marginTop:20, width:'90%', alignSelf:'center'}}
                mode="outlined"
                label="Last Name"
                value={lastname}
                onChangeText={ln =>setLastname(ln)}
                theme={{ colors: { primary: 'orange', placeholder: 'orange', underlineColor:'transparent', background:'white'}}}
            />

            <TextInput
                style={{marginTop:20, width:'90%', alignSelf:'center'}}
                mode="outlined"
                label="Phone"
                value={phone}
                onChangeText={phone =>setPhone(phone)}
                theme={{ colors: { primary: 'orange', placeholder: 'orange', underlineColor:'transparent', background:'white'}}}
            />
            
            <Button style={{width:'50%', alignSelf:'center', marginTop:20}} 
                icon={require('../../assets/save-icon.png')} 
                mode="contained"
                color="orange" 
                onPress={handleSave}>
                Save Changes
            </Button>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:40
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  }
});