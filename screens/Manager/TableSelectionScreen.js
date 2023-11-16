import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db } from '../../database/firebase'; // Adjust this import based on your Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';

const TableManagementScreen = () => {
  const [tables, setTables] = useState([]);
  const [id, setid]= useState([])
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentUserReservation, setCurrentUserReservation] = useState(null);

  useEffect(() => {
    fetchCurrentUserReservation();
    const unsubscribe = db.collection('Tables')
      .onSnapshot(snapshot => {
        const fetchedTables = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTables(fetchedTables);
      });

    return () => unsubscribe();
  }, []);

  const fetchCurrentUserReservation = async () => {
    try {
      const reservationData = await AsyncStorage.getItem('@UserStorage');
      if (reservationData !== null) {
        setCurrentUserReservation(JSON.parse(reservationData));
      }
    } catch (e) {
      Alert.alert("Error", "Failed to fetch current reservation data.");
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
  };

  const confirmTableSelection = async () => {
    if (selectedTable && currentUserReservation) {
      try {
        // Step 1: Remove reservation data from old table
        await db.collection('Tables').doc(currentUserReservation.tableRef)
          .collection('Reservation').doc(currentUserReservation.reservationId)
          .delete();
  
        // Step 2: Add reservation data to new table
        await db.collection('Tables').doc(selectedTable.ref)
          .collection('Reservation').doc(currentUserReservation.reservationId)
          .set({
            ...currentUserReservation
          });
          await db.collection('Tables').doc(selectedTable.ref).update({
            status: 'Occupied'
          });
        // Step 3: Update user's reservation data
        const newReservationData = {
          tableID: selectedTable.id,
          tableRef: selectedTable.ref,
          tableType: selectedTable.name // or whatever field represents the table type
        };
  
        await db.collection('UserData').doc(currentUserReservation.email)
          .collection('Reservation').doc(currentUserReservation.reservationId)
          .update(newReservationData);
  
        // Confirmation message
        Alert.alert("Reservation Updated", `Your reservation has been moved to table ${selectedTable.name}`);
      } catch (error) {
        console.error("Error updating reservation: ", error);
        Alert.alert("Error", "Failed to update reservation.");
      }
    }
  };
  

  const renderTableItem = ({ item }) => {
    const isOccupied = item.status === 'Occupied';
    const isCurrentUserTable = currentUserReservation?.tableId === item.id;
    return (
      <TouchableOpacity 
        style={[
          styles.table, 
          isCurrentUserTable && styles.tableHeldByUser,
          isOccupied && styles.tableOccupied 
        ]} 
        onPress={() => isOccupied ? null : handleTableSelect(item)}
        disabled={isOccupied}
      >
        <Text style={styles.tableText}>Table {item.name}</Text>
        <Text style={styles.tableText}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Table</Text>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Adjust as needed for your layout
      />
      <TouchableOpacity
        style={[styles.confirmButton, !selectedTable && styles.buttonDisabled]}
        onPress={confirmTableSelection}
        disabled={!selectedTable}
      >
        <Text style={styles.confirmButtonText}>Confirm Table</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '45%', // Adjust as needed
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  tableSelected: {
    borderColor: '#FFEB3B',
    borderWidth: 3,
  },
  tableText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableHeldByUser: {
    backgroundColor: '#808080', // Gray color for the table held by the current user
  },
  tableOccupied: {
    backgroundColor: '#F44336', // Red color for occupied tables
    opacity: 0.6,
  },
});

export default TableManagementScreen;
