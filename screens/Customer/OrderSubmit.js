import { Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import React, { useState,useEffect } from 'react'
import { PrimaryButton } from '../../components/Button'
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default OrderSubmit = ({ navigation }) => {
  const [udata, setUdata] = useState({});
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@reservation');
        if (savedData !== null) {
          setUdata(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error fetching reservation data from AsyncStorage:", error);
      }
    };

    const fetchCartData = async () => {
      const savedCartData = await AsyncStorage.getItem('@cartItems');
      if (savedCartData) {
        setCartData(JSON.parse(savedCartData));
      }
    };

    fetchReservationDetails();
    fetchCartData();
  }, []);

  const saveReservation = async (withFood = false) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Assuming `udata` contains `reservationDate` and `reservationTime`
    // which are strings in a format that can be used to construct a Date object.
    // Example: '2023-11-04' and '14:00' (2 PM)
    const reservationStart = new Date(`${udata.Date}T${udata.Time}`);
    const reservationEnd = new Date(reservationStart.getTime() + (60 * 60 * 1000)); // Reservation end time (one hour later)
  
    try {
      // Reference to the specific table document
      const tableRef = db.collection('Tables').doc(`${udata.tableType}_table_${udata.tableCount}`);
      
      // Update the table's document with the current reservation
      await tableRef.set({
        currentReservation: {
          startTime: reservationStart,
          endTime: reservationEnd,
          user: user.email,
          foodDetails: withFood ? cartData : []
        }
      }, { merge: true });
  
      // Add a reservation record to the user's collection
      await db.collection('UserData').doc(user.email).collection('Reservation').add({
        ...udata,
        tableRef: tableRef.path,
        startTime: reservationStart,
        endTime: reservationEnd,
        foodDetails: withFood ? cartData : [],
        status: "reserved"
      });
  
      console.log("Reservation saved successfully!");
      navigation.replace('Confirm_res');
    } catch (error) {
      console.error("Error saving reservation:", error);
    }
  };
  
  

  const handleCheckout = () => {
    Alert.alert(
      "Food Checkout",
      "Do you want to proceed with food?",
      [
        {
          text: "Yes",
          onPress: () => {
            Alert.alert(
              "Your Cart Items",
              `${cartData.map(item => `\n- ${item.name}`).join('')}`,
              [
                {
                  text: "Confirm",
                  onPress: () => saveReservation(true)
                },
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]
            );
          }
        },
        {
          text: "No, only table",
          onPress: () => saveReservation(false)
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Image source={require('../../assets/table_res.gif')} style={styles.gifImage} />
            <Text style={styles.headerText}>Your Table has been Reserved</Text>
        </View>

        {renderInfo('date', 'Date', udata.Date)}
        {renderInfo('clock', 'Date', udata.Time)}
        {renderInfo('diningTable', 'Table_Type', udata.Table_Type)}
        {renderInfo('people', 'Number_of_People', udata.Number_of_People)}

      
      <View style={styles.checkoutButton}>
        <PrimaryButton
          title={ 'Checkout'}
          btnContainer={{

            backgroundColor: 'orange',
            height: 55, width: 200,
            borderRadius: 24,
            marginTop: 24

            }}
          onPress={handleCheckout}
        />
      </View>
    </SafeAreaView>
  );
}
const renderInfo = (icon, key, value) => (
  <View style={styles.infoRow}>
      <Image style={styles.infoIcon} source={images[icon]} />
      <Text style={styles.infoText}>{value}</Text>
  </View>
);
const images = {
  clock: require('../../assets/order/clock.png'),
  diningTable: require('../../assets/order/dining-table.png'),
  people: require('../../assets/data/people.png'),
  date: require('../../assets/table/reservation.png'),

};
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
  },
  gifImage: {
      height: 280,
      width: 280
  },
  headerText: {
      alignSelf: 'center',
      color: '#FF4655',
      fontSize: 22,
      marginTop: 20
  },
  infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30
  },
  infoIcon: {
      height: 30,
      width: 30
  },
  infoText: {
      alignSelf: 'center',
      color: '#FF4655',
      fontSize: 18,
      marginLeft: 20
  },
  continueButton: {
      marginTop: 40
  },
  primaryButton: {
      height: 60,
      width: 200,
      borderRadius: 20,
      backgroundColor: '#FF4600'
  },  
  foodSection: {
    flex: 1,
  },
  foodHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  checkoutButton: {
    marginBottom: 20,
    alignItems: 'center',
},

});