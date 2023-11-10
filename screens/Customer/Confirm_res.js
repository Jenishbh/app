import { Dimensions, SafeAreaView, Text, View, Image, ScrollView,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState,useEffect,useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
//import ZigzagView from "react-native-zigzag-view"
import QRCode from 'react-native-qrcode-svg';
import { PrimaryButton } from '../../components/Button';
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import { captureRef   } from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from 'expo-linear-gradient';


function Confirm_res ({navigation, route }){
  const item = route.params
  
  const [udata, setUdata] = useState('');
  const [rdata, setRdata] = useState('');
  const [foodData, setFoodData] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const safeAreaViewRef = useRef();



 

  
  const CreateQR=()=>{
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return(
      <QRCode 
           value={JSON.stringify([item.user,item.reservationId])}
          
           logoSize={30}
           logoBackgroundColor='transparent'
           />
    )
  }
  
  

// ...


const saveScreenshot = async () => {

      // Optionally save the image to the device's gallery
      try {
        // Capture screenshot
        const uri = await captureRef(safeAreaViewRef, {
          format: 'png',
          quality: 0.8,
        });
  
        // Request permission to save to gallery
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          // Save the captured image to gallery
          await MediaLibrary.saveToLibraryAsync(uri);
          alert('Saved to photos!');
        } else {
          alert('Permission not granted!');
        }
      } catch (error) {
        console.error("Failed to save screenshot", error);
        alert('An error occurred!');
      }

    
  
  navigation.navigate('Home')
};


return (
  <ScrollView style={styles.scrollView}>
    <LinearGradient
      colors={['#e9ecef', '#adb5bd']} // Adjust these colors to your preference
      style={styles.gradientBackground}
    >
      <View style={styles.header}>
        <Icon name='arrow-back-ios' size={28} color="#FFF" onPress={navigation.goBack} />
      </View>

      <Image
        source={require('../../assets/third.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Thanks for your reservation!</Text>
      <Text style={styles.subtitle}>Please Save this QR code with you</Text>

      <View style={styles.reservationDetails}>
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>Table</Text>
    <Text style={styles.detailValue}>{item.Table}</Text>
  </View>
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>Guests</Text>
    <Text style={styles.detailValue}>{item.count}</Text>
  </View>
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>Date</Text>
    <Text style={styles.detailValue}>{item.Date}</Text>
  </View>
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>Time</Text>
    <Text style={styles.detailValue}>{item.Time}</Text>
  </View>
</View>

      <View style={styles.qrCodeContainer}>
        <CreateQR />
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={saveScreenshot}>
        <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </LinearGradient>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, // Adjust this value as needed
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -140,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
   
  },
  reservationDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for a grayish effect
    borderRadius: 15,
    padding: 20,
    width: '80%', // Adjust width as needed
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
    justifyContent: 'space-between',
    paddingBottom:-20
  },
  detailItem: {
    // Half the width of the parent minus padding
    width: '48%', // Slightly less than half to account for justifyContent space-between
    marginBottom: 20, // Spacing between rows
    
    
  },
  detailLabel: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 15,
    textAlign:'center',
    
  },
  detailValue: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign:'center'
  },
  reservationInfo: {
    fontSize: 16,
    color: '#FFF',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  qrCodeContainer: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'white', // White background to contrast with QR code
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#FF1493', // Deep pink
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
    marginBottom: 50, // Added space at the bottom
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  logo: {
    width: 280, // Adjust as needed
    height: 280,
    top:-80  // Adjust as needed
     // Space from the top of the screen
  },
});



export default Confirm_res; 
 