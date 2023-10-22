import { Dimensions, SafeAreaView, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
//import ZigzagView from "react-native-zigzag-view"
import QRCode from 'react-native-qrcode-svg';
import { PrimaryButton } from '../../components/Button';
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import { captureRef } from "react-native-view-shot";
 // if you want to save the image to the device's gallery



function Confirm_res ({navigation}){

  const [udata, setUdata] = useState('');
  const [rdata, setRdata] = useState('');
  const [foodData, setFoodData] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      // Fetch UserData
      try {
        const userDoc = await db.collection('UserData').doc(user.email).get();
        if (userDoc.exists) setUdata(userDoc.data());
      } catch (error) {
        console.error("Error fetching UserData:", error);
      }

      // Fetch Reservation
      try {
        const reservationDoc = await db.collection('Reservation').doc(user.email).get();
        if (reservationDoc.exists) setRdata(reservationDoc.data());
      } catch (error) {
        console.error("Error fetching Reservation:", error);
      }

      // Fetch Food Data
      try {
        const foodCollection = await db.collection('Reservation').doc(user.email).collection('Food').get();
        if (!foodCollection.empty) {
          const foods = foodCollection.docs.map(doc => doc.data());
          setFoodData(foods);
        } else {
          setFoodData([]);
        }
      } catch (error) {
        console.error("Error fetching Food Data:", error);
      }
    };

    fetchData();
  }, []);


  const name ={
      Email: user.email+" ", 
      Name: udata.name+"  ",
      }
  const table ={
    Table: rdata.Table_Type+" ",
      People: rdata.Number_of_People,
      
  }
  
  
 const food ={
  food: foodData
 }
 
console.log(food)
 

  
  const CreateQR=()=>{
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return(
      <QRCode 
           value={JSON.stringify([name, table, food.food])}
          
           logoSize={30}
           logoBackgroundColor='transparent'
           />
    )
  }
  
  

// ...





  
    const Receipt = () => {
        
        return <SafeAreaView
          backgroundColor={'white'}
          surfaceColor="#F7F7F7"
          top={false}
          
          style={{
            marginTop:15 ,
            width:300,
            alignSelf:'center',
            
            
          }}
        >
            <View style={{marginVertical:20}}>
          <View style={{borderRadius:40, backgroundColor:'lightgray', height:70,width:70, justifyContent:'center',alignSelf:'center'}}>
                <Text style={{fontSize:20, textAlign:'center',color:'white'}}>JP</Text>
                
          </View>
          <Text style={{fontSize:15, textAlign:'center',color:'gray',paddingTop:5}}>NAME</Text>
          <Text style={{fontSize:18, textAlign:'center',color:'#414449',paddingTop:5}}>{udata.name}</Text>
          </View>

          <View style={{marginVertical:20}}>

          <Text style={{fontSize:15, textAlign:'center',color:'gray'}}>PHONE NUMBER</Text>
          <Text style={{fontSize:18, textAlign:'center',color:'#414449',paddingTop:5}}>{udata.phone}</Text>

          </View>
          <View style={{marginVertical:20}}>

          <Text style={{fontSize:15, textAlign:'center',color:'gray'}}>EMAIL</Text>
          <Text style={{fontSize:18, textAlign:'center',color:'#414449',paddingTop:5}}>{user.email}</Text>

          </View>
          <View style={{borderBottomColor:'lightgray',borderBottomWidth:0.5,width:250,alignSelf:'center'}}></View>

          <View style={{marginVertical:20}}>

          <Text style={{fontSize:30, textAlign:'center',color:'#67C8D5'}}>Scan QR Code</Text>
          <Text style={{fontSize:15, textAlign:'center',color:'#414449', paddingHorizontal:13, paddingTop:10}}>Is available, the waiter can easilt check the user in</Text>
          <View style={{alignSelf:'center',paddingTop:10}} >
            <CreateQR/>
           </View>
          </View>
        </SafeAreaView>
      }



const saveScreenshot = async () => {

      // Optionally save the image to the device's gallery
      
    
    
  
  navigation.navigate('Home')
};


    return(

        <SafeAreaView style={{backgroundColor:'white', flex:1}}>
            {/* {Header} */}
            <View style={{ 
                paddingVertical:10,
                marginHorizontal:20,
                alignContent: 'space-between',
                flexDirection: 'row',
                }}>
                
               
                <Icon name ='arrow-back-ios' size={28} onPress={navigation.goBack}/>
            
                
            </View>
            <Text style={{fontSize: 20,alignSelf:'center' }} onPress={navigation.goBack}>Receipt</Text>
            <Receipt />

            <View style={{marginTop:20}}>
                
                <PrimaryButton
                    title={'Order Now'}
                    btnContainer={{
                        backgroundColor:'#67C8D5',
                        height:60,
                        width:300,
                        borderRadius:60,
                        alignSelf:'center'
                    }}onPress={saveScreenshot} />
                
                
            </View>
            <View >
                
                
            </View>
        </SafeAreaView>
    )

}


export default Confirm_res; 
 