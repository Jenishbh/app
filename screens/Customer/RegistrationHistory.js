//want to retrive the registration history from firebase 
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, Image, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { db } from "../../database/firebase";
import Icon from 'react-native-vector-icons/Fontisto'
import Icona from 'react-native-vector-icons/Ionicons'
import Ico from 'react-native-vector-icons/MaterialCommunityIcons'



const RegistrationHistory = ({navigation}) => {

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userEmail = "jenishpatelbh99@gmail.com";  // Replace with dynamic email if needed
        const userDoc = db.collection('UserData').doc(userEmail);
        const reservationSnapshot = await userDoc.collection('Reservation').get();
        
        const fetchedReservations = reservationSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setReservations(fetchedReservations);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
      }
    };

    fetchReservations();
  }, []);   
    const ReservationCard = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('RegistrationDetails', { reservation: item })}>
        <View style={styles.card}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.cardContent}>
          
            <Text style={styles.cardTitle}>{item.Table_Type}</Text>
            <Text><Icon name="date" size={10} />{` ${item.Date}`}</Text>
      <Text><Icona name="people-outline" size={10} />{` ${item.Number_of_People}`}</Text>
      
          </View>
        </View>
        </TouchableOpacity>
      );


    return(

        <SafeAreaView style={styles.container} >              
            <View style={styles.container}>
                <Text style={styles.title}>My Reservations</Text>
                <FlatList
                    data={reservations}
                    renderItem={({ item }) => <ReservationCard item={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'white',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      height:90,
      flexDirection: 'row',
      backgroundColor: '#e7feff',
    shadowColor: '#ededed',
    shadowRadius: 10,
    shadowOpacity: 10,
    borderWidth:1,
    borderColor: '#f5f5f5',
      marginBottom: 20,
      paddingBottom: 10,
      marginVertical:15,
      borderRadius:30
   
    },
    thumbnail: {
      width: 60,
      height: 60,
      marginRight: 15,
    },
    cardContent: {
      flex: 1,
      marginVertical: 10,
      justifyContent: 'space-between',
      

      
      
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    status: {
      marginTop: 10,
      color: 'red',
      fontWeight: 'bold',
    },
  });























export default RegistrationHistory;