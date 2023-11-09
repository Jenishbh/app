import { Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import React, { useState,useEffect } from 'react'
import { PrimaryButton } from '../../components/Button'
import {db} from '../../database/firebase'
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import firebase from 'firebase/app';
import { arrayUnion } from 'firebase/firestore';


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


  // A function to check for the next available table of a specific type
  const getNextAvailableTable = async (tableType, reservationTimestamp) => {
    try {
      // Get a reference to the collection of tables
      const tablesRef = db.collection('Tables');
      
  
      // Query for tables of the specific type
      let querySnapshot;
      try {
        const query = tablesRef.where('name', '==', tableType).orderBy('name');
        querySnapshot = await query.get();
      } catch (queryError) {
        
        throw new Error("Query failed for tables of the specified type.");
      }
  
      
  
      if (!querySnapshot.empty) {
        let availableTableRef = null;
  
        for (const doc of querySnapshot.docs) {
          let tableData;
          try {
            tableData = doc.data();
          } catch (dataError) {
            console.error("Error getting document data: ", dataError);
            continue; // Skip to the next document
          }
          
          console.log('Table data:', tableData);
          console.log('Reservation timestamp:', reservationTimestamp);
  
          // Check if the table is available
          if (!tableData.reservations || !tableData.reservations.includes(reservationTimestamp)) {
            availableTableRef = doc.ref;
            console.log('Found available table:', availableTableRef);
            break; // Exit the loop once an available table is found
          }else {
            alert('All Tables are curruntly reserve for this timeslots please either select a new time slot or new table')
            navigation.navigate('Home')//navigate user to reservation details screen
          }
        }
  
        if (availableTableRef) {
          try {
            // Found an available table, so reserve it by adding the reservation timestamp to it
            await availableTableRef.update({
              reservations: arrayUnion(reservationTimestamp)
            });
          } catch (updateError) {
            console.error("Error updating table reservation: ", updateError);
            throw new Error("Failed to update table with reservation.");
          }
  
          return availableTableRef;
        } else {
          console.log('No documents found');
          return null; // Indicate no available tables were found
        }
      } else {
        console.log('No tables of the specified type were found.');
        return null; // Indicate no tables of the specified type were found
      }
    } catch (error) {
      console.error("Error in getNextAvailableTable: ", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  

  const saveReservation = async (udata, withFood = false) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Assuming `udata` contains `reservationDate` and `reservationTime`
    // which are strings in a format that can be used to construct a Date object.
    // Example: '2023-11-04' and '14:00' (2 PM)
    console.log(udata)
    
      const datePart = moment(udata.Date, 'ddd, M/D/YYYY').format('YYYYMMDD');
      const timePart = udata.Time.replace(':', '');
      const formatDateForDocument = `${datePart}_${timePart}`;
    
  
    // Function to check the availability of a table and return the tableRef if available

  
    // Try to find an available table
    const tableRef = await getNextAvailableTable(udata.Table_Type, formatDateForDocument);
    const addReservationToTable = async (tableRef, reservationDetails) => {
      // Add the reservation to the Reservations sub-collection
      return tableRef.collection('Reservations').doc(formatDateForDocument).set(reservationDetails);
    };
    if (tableRef){

    try {
      const reservationDetails = {
        Date: udata.Date,
        Time: udata.Time,
        user: user.email,
        count: udata.Number_of_People,
        foodDetails: withFood ? cartData : []
      };
      // Reference to the specific table document
      await addReservationToTable(tableRef, reservationDetails);
  
      // Add a reservation record to the user's collection
      await db.collection('UserData').doc(user.email).collection('Reservation').add({
        ...udata,
        tableRef: tableRef.path,
        Time: udata.Time,
        count: udata.Number_of_People,
        foodDetails: withFood ? cartData : [],
        
      });
  
      console.log("Reservation saved successfully!");
      navigation.replace('Confirm_res');
    } catch (error) {
      console.error("Error saving reservation:", error);
    }
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
                  onPress: () => saveReservation( udata, true)
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
          onPress: () => saveReservation(udata,false)
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






