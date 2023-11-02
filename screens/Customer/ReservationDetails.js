import React,{useState, useEffect}from "react";
import { View,Image, Text, StyleSheet,  TextInput, ScrollView, TouchableOpacity,Dimensions, Alert, Button } from "react-native";
import {PrimaryButton} from "../../components/Button";

import Icona from 'react-native-vector-icons/FontAwesome5' 
import Icon from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-async-storage/async-storage';

//import firebase from "firebase/compat";
//import { Manager_db } from '../../database/ManagerFirebase'


const ReservationDetails=({navigation, route})=>{


        const item = route.params;
        const [count, setCount] = useState(0);
        
        const [username, setUsername] = useState({});
        const [selectedDate, setSelectedDate] = useState('');
        const [selectedTime, setSelectedTime] = useState('');


        //const auth = getAuth();
        //const user = auth.currentUser;
        useEffect(() => {
         
          
          const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('user_data');
                if (storedData) {
                    const udata = JSON.parse(storedData);
                    setUsername(udata.username || '');
                    
                }
            } catch (error) {
                console.error("Error fetching user data from AsyncStorage:", error);
                Alert.alert('Error fetching user data. Please try again.');
            }
        };

        fetchUserData();
  
      }, []);
        
        //    {Counter function}

          function Counter(){
            
            
              const addCountHandler = () => {
                if (count === parseInt(item.size))
                {return;}
                setCount(count + 1);
              };
              const removeCountHandler = () => {
                if(count === 0){
                  return;  
                }
                setCount(count - 1);
              };
            
              return (
                <View style={{marginHorizontal: 5, marginVertical:20, flexDirection: 'row',}}  >
                <Text style={{fontWeight: 'bold'}} > Number Of Persons</Text>
                    <View style={{marginHorizontal:50}}>
                    <TouchableOpacity onPress={removeCountHandler} style={{padding:10, margin:-10}}>
                    <Icona name='minus' size={18}  /></TouchableOpacity>
                    </View>
                    <Text >{count}</Text>
                    <View style={{marginHorizontal:50}}>
                      <TouchableOpacity onPress={addCountHandler} style={{padding:10, margin:-10}}>
                    <Icona name='plus' size={18}   /></TouchableOpacity>

                    </View>
                    </View>
              );
            };
            
          //const handlebook =() =>{
            
          //  db
          //  .collection('Reservation')
          //  .doc(user.email)
          //  .set(
          //    {
          //      Name: udata.firstName+' '+udata.lastName,
          //      Date : currentDate,
          //      Table_Type: item.name,
          //      Number_of_People: count
          //      
          //  
          //    }
          //  
          //  )
          //  .then(()=> console.log('data added'))
          //  .catch((error)=>alert(error.message))
            
            //Manager_db
            //.collection('Reservation')
            //.add(
            //  {
            //    'Date' : firebase.firestore.Timestamp.now(),
            //    'Email' : user.email,
            //    'Table Type': item.name,
            //    'Number of People': count
            //  }
            //)
  
            //navigation.navigate('OrderSubmit', Table)
          //}

          const storeReservationDetails = async (reservationData) => {
            try {
              await AsyncStorage.setItem('@reservation', JSON.stringify(reservationData));
            } catch (error) {
              console.error("Error saving reservation data to AsyncStorage:", error);
            }
          };
          const handlebook = async () => {
            if (count > 0 & selectedDate != null & selectedTime != null) {
                try {
                    const reservationData = {
                        Name: username,
                        Date: selectedDate,
                        
                        Time: selectedTime,
                        Table_Type: item.name,
                        Number_of_People: count
                    };
                    

                    // Assuming storeReservationDetails is an async function
                    await storeReservationDetails(reservationData);
                    navigation.navigate('OrderSubmit');
                     // or any other notification method
                } catch (error) {
                    console.error("Failed to store reservation:", error);
                    alert("Error occurred while trying to book. Please try again.");
                }
            } else {
                alert("Opps! Somthing Missing.");
            }
        }
        






// or whatever library you're using for icons
const DateAndTimePicker = ({selectedDate, setSelectedDate, selectedTime, setSelectedTime}) => {

  const getUpcomingWeek = () => {
    const result = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        result.push({
            day: dayName,
            date: date.getDate()
        });
    }
    return result;
  };
  const handleTimeChange = (dateValue) => {
    if (selectedTime === dateValue) {
        setSelectedTime(null);
    } else {
        setSelectedTime(dateValue);
        console.log(dateValue);
    }
}
  const handleDateChange = (dateValue) => {
    console.log(dateValue);
    if (selectedDate === dateValue) {
        setSelectedDate(null);
        
    } else {
        setSelectedDate(dateValue);
    }
  }


const dates = getUpcomingWeek();
  const times = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];

    return (
        <View style={style.container}>
          <View >
            <Text style={{textAlign: 'left', marginVertical:20,  fontWeight:'bold'}} >Pick a Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dates.map((item, index) => (
                    <TouchableOpacity 
                    key={index} 
                    style={[style.dateItem, item.day === selectedDate && style.selected]}
                    onPress={() => handleDateChange(item.day)}
                >
                    <Text>{`${item.date} ${item.day}`}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            </View>
            <View style={{paddingVertical:20}}>
            <Text style={{textAlign: 'left', marginVertical:20,  fontWeight:'bold'}}>Pick a Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((time, index) => (
                    <TouchableOpacity 
                    key={index} 
                    style={[style.timeItem, time === selectedTime && style.selected]}
                    onPress={()=>handleTimeChange(time)}
                >
                    <Text>{time}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
            </View>
        </View>
    );
}





const List = () => { // Don't forget to pass the 'item' prop to List when you use it
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal:10, flex:1 }}>
            
            <View style={style.categorryBtnn}>
                <Icona name="hashtag" size={20} color="grey" />
                <Text 
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 5,
                        color: 'lightblue'
                    }}>
                    {item.desO} 
                </Text>
            </View>

            <View style={style.categorryBtnn}>
                <Icona name="hashtag" size={20} color="grey" /> 
                <Text 
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 5,
                        color: 'lightblue'
                    }}>
                    {item.desT} 
                </Text>
            </View>

            <View style={style.categorryBtnn}>
                <Icon name="people" size={20} color="grey" />
                <Text 
                    style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 5,
                        color: 'lightblue'
                    }}>
                    {item.desS} 
                </Text>
            </View>
        </View>
    )
}



    return(
        <ScrollView>
        <View 
        style={{flex:1,
            backgroundColor: 'white'}}
            >
                

                
                <View style={{height: 400, width:Dimensions.width,justifyContent: 'center', alignContent: 'center', }} >
                
                    <Image  source={item.image} 
                    style={{height: 270, width:400, borderBottomLeftRadius:25, borderBottomRightRadius:25, right:4}} />

                <View style ={{borderRadius: 15,
                bordercolor: 'white', 
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,  
                height: 100, width: 320, 
                top : -20, backgroundColor: 'white', alignSelf:'center', padding:10}}> 


                <View style={{flexDirection: 'row' , justifyContent: 'space-between', paddingHorizontal:5}}>
                        <Text style={{color: 'lightblue',fontSize:20,}}>{item.name}</Text>
                        <Text style={{fontSize:17, color: 'orange', top:2}}> Available</Text>
                    
                </View>

                <View style={{marginTop:5, alignSelf:'center', marginHorizontal: 10}}>
                    <List />
                </View>
                
                </View>                   
                </View>

                <View style={{marginHorizontal: 8, paddingVertical: 10, }}>
                <Text style={{fontSize:16, fontWeight:'bold',}}>Details</Text>
                <Text style={{fontSize:14, color: 'gray', alignSelf:'flex-start', paddingTop: 10}}>Seize the Momemt. Meet Spark,a mini drone that features all of DJI's signature technologies, allowing you to size the moment whenever you feel inspired </Text>
                 
                 </View>

                 

                    <Counter />
                    
                    <DateAndTimePicker
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate} 
                    selectedTime={selectedTime} 
                    setSelectedTime={setSelectedTime}  />
                 

                 

                 <View style={{marginHorizontal: 8, marginVertical:20, paddingVertical: 20}}>

                 <Text style={{fontWeight: 'bold'}} >Add Comments</Text>

                 <TextInput style={{height:100, width:350,borderRadius: 15, marginVertical:5,
                 backgroundColor: 'white',borderColor:'white',  shadowColor: 'gray', shadowOffset: {height: 4, width:0}, shadowOpacity: 0.2, shadowRadius: 3
                 
                 }} placeholder=' Write Comments' />

                 </View>




                

                

               

                <View style={{paddingBottom:70}}>
            

                <PrimaryButton
                btnContainer={{
                  height:50,
                  borderRadius:50,
                  width:200,
                  alignSelf: 'center',
                  
                }}
                onPress={handlebook}
                    title='Book Now'/>
                </View>


        </View>
        </ScrollView >
    )


    


}

const style = StyleSheet.create({
categorryBtn:{
    height: 45,
    width: 100,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    

   },
categorryBtnn:{
    height: 33,
    
    
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    flexDirection: 'row',
    
    

   },

   categorryBtnImgCon:{
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
   },
   container: {
    flex: 1,
    padding: 8,
    
},
dateItem: {
  marginHorizontal: 8,
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'lightgray', // you can adjust this as per your preference
  alignItems: 'center',
  justifyContent: 'center',
  
    
    
},
timeItem: {
  marginHorizontal: 8,
  paddingVertical: 5,
  paddingHorizontal: 15,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: '#D3D3D3', // you can adjust this as per your preference
  alignItems: 'center',
  justifyContent: 'center',
  
},
selected: {
    backgroundColor: '#D1E8FF',
}
  
})






export default ReservationDetails;