import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../../database/firebase'; // Adjust the path as needed
import moment from 'moment';

const ManagerScreen = ({navigation}) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Tables').onSnapshot(snapshot => {
      const fetchedTables = [];
      snapshot.docs.forEach(async doc => {
        const tableData = { id: doc.id, ...doc.data() };
        const reservationsSnapshot = await doc.ref.collection('Reservation').get();
        tableData.Reservation = reservationsSnapshot.docs.map(resDoc => ({
          id: resDoc.id,
          ...resDoc.data()
        }));
        
        fetchedTables.push(tableData);
      });
      
      setTables(fetchedTables);
      
      
    });

    return () => unsubscribe();
  }, []);

  const calculateRemainingTime = (orderTime, duration) => {
    const currentTime = new Date();
    const orderDateTime = new Date(orderTime); // Assuming orderTime is a valid date-time string
    const durationInMilliseconds = parseInt(duration) * 60 * 1000; // Convert duration from minutes to milliseconds
  
    // Calculate time left
    const endTime = new Date(orderDateTime.getTime() + durationInMilliseconds);
    const timeLeft = endTime.getTime() - currentTime.getTime();
  
    // Convert time left in milliseconds to a readable format
    if (timeLeft <= 0) {
      return 'Overdue';
    }
  
    const minutesLeft = Math.floor(timeLeft / 60000);
    const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
  
    return `${minutesLeft}m ${secondsLeft}s`;
  };
  
  


  

  const renderTableItem = ({ item }) => {
    const isoccupied = item.Reservation.map(rese => rese.status === 'confirmed').some(value => value === true);
    const reserved = item.Reservation.filter(res => res.status === 'confirmed' )
    console.log(reserved)
    return (
      <TouchableOpacity
        style={[styles.tableCard, isoccupied ? styles.available : styles.reserved]}
        onPress={() => navigation.navigate('TableDetailsScreen', { reserved })}
      >
        <Text style={styles.tableCardTitle}>{item.name} (ID: {item.id})</Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tableCard: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    
    // Add more styles as needed
  },
  tableCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderItem: {
    // Normal style
  },
  reserved: {
    backgroundColor: 'lightblue',
  },
  available: {
    backgroundColor: 'gray',
  },
  tableCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  warning: {
    backgroundColor: 'yellow',
  },
  overdue: {
    backgroundColor: 'red',
  },
});

export default ManagerScreen;
