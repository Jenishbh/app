import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../database/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {


    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imageKey, setImageKey] = useState(Date.now());



    useEffect(() => {
        // Fetch user data from AsyncStorage on component mount
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('user_data');
                if (storedData) {
                    const udata = JSON.parse(storedData);
                    setUsername(udata.username || '');
                    setEmail(udata.email || '');
                    setPhone(udata.phone || '');
                    setImgUrl(udata.imgUrl || '');
                }
            } catch (error) {
                console.error("Error fetching user data from AsyncStorage:", error);
                Alert.alert('Error fetching user data. Please try again.');
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const updateObj = {};
            if (username) updateObj.name = username;
            if (phone) updateObj.phone = phone;
            if (imgUrl) updateObj.imgUrl = imgUrl;
            console.log(imgUrl)
            

            // Update Firestore
            await db.collection('UserData').doc(email).update(updateObj);

            // Update AsyncStorage
            const storedData = await AsyncStorage.getItem('user_data');
            if (storedData) {
                const udata = JSON.parse(storedData);
                const updatedData = { ...udata, ...updateObj };
                await AsyncStorage.setItem('user_data', JSON.stringify(updatedData));
            }

            Alert.alert('Update successfully!');
        } catch (error) {
            console.error("Error updating user data: ", error);
            Alert.alert('Error updating data. Please try again.');
        }
    };

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
        const imageUri = result.assets[0].uri;
        setImgUrl(imageUri);
        console.log(imageUri);
        setImageKey(Date.now());
        

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
        setImgUrl(result.assets[0].uri);
        console.log(imgUrl);
        setImageKey(Date.now());
      }
    }
    

    return (
      <SafeAreaView style={{flex:1,backgroundColor: 'white'}}>
            <View style={styles.header}></View>
            
            <TouchableOpacity onPress={showImagePicker}>
            <Image
              key={imageKey}  // Add the key prop here
              source={imgUrl === '' ? require("../../assets/profile.png") : { uri: imgUrl }}
              style={styles.avatar}
            />
              
            </TouchableOpacity>

            <Text style={{alignSelf:'center', top:190}}>Tap Image for Change</Text>
            <View style={{alignSelf:'center', top:200}}>
            <Text style={{fontSize: 28, fontWeight: 'bold', textAlign: 'center'}}> {username}</Text>
            </View>
            
            <View style={{ top:220}}>
           
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
                value={username}
                onChangeText={fn =>setUsername(fn)}
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
            <Button 
              style={{width:'30%', alignSelf:'center', marginTop:20}} 
              mode="contained"
              color="red" 
              onPress={() => auth.signOut().then(() => navigation.navigate('Signin'))}>
              Logout
            </Button>

            </View>

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