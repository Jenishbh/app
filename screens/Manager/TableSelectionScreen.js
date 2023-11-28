import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Modal  } from 'react-native';
import { db } from '../../database/firebase'; // Adjust this import based on your Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const TableManagementScreen = () => {
  const [tables, setTables] = useState([]);
  const [id, setid]= useState([])
  const [selectedTable, setSelectedTable] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currentUserReservation, setCurrentUserReservation] = useState(null);

  useEffect(() => {
    fetchCurrentUserReservation();
    const unsubscribe = db.collection('Tables')
      .onSnapshot(snapshot => {
        const fetchedTables = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTables(fetchedTables);
      });

    return () => unsubscribe();
  }, [selectedTable]);

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

  const handleTableSelect = (item) => {
    console.log("Table selected:", item);
  
    // Check if the table has reservations within the next three hours
    const currentTime = new Date();
    const threeHoursLater = new Date(currentTime.getTime() + 3 * 60 * 60 * 1000);
  
    const reservationsWithinThreeHours = (item.reservations || []).filter(reservationTime => {
      const reservationDateTime = moment(reservationTime, 'YYYYMMDD_hhA').toDate();
      return reservationDateTime >= currentTime && reservationDateTime <= threeHoursLater;
    });
  
    if (reservationsWithinThreeHours.length > 0) {
      // Format the reservation details
      const formattedReservations = reservationsWithinThreeHours.map(reservation => {
        return moment(reservation, 'YYYYMMDD_hhA').format('MMMM Do YYYY, h:mm a');
      });
  
      setSelectedTable({
        ...item,
        message: `Reservations within the next 3 hours: ${formattedReservations.join(', ')}`
      });
  
      setIsModalVisible(true);
    } else {
      // Simply select the table, no modal or alert needed
      setSelectedTable(item);
    }
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
          await db.collection('Tables').doc(selectedTable.ref).collection('Reservation').doc(currentUserReservation.reservationId).update({
            status: 'confirmed'
          });
        // Step 3: Update user's reservation data
        const newReservationData = {
          ...currentUserReservation,
          tableID: selectedTable.id,
          tableRef: selectedTable.ref,
          tableType: selectedTable.name // or whatever field represents the table type
        };
         
        
        await db.collection('UserData').doc(currentUserReservation.email)
          .collection('Reservation').doc(currentUserReservation.reservationId)
          .update(newReservationData);
        // Step 4: Update user's reservation data in AsyncStorage
        await AsyncStorage.setItem('@UserStorage', JSON.stringify(newReservationData));
        // Confirmation message
        Alert.alert("Reservation Updated", `Your reservation has been moved to table ${selectedTable.name}`);
        navigation.navigate('FoodSelectionScreen');
      } catch (error) {
        console.error("Error updating reservation: ", error);
        Alert.alert("Error", "Failed to update reservation.");
      }
    }
  };

  

  const renderTableItem = ({ item }) => {
    const isOccupied = item.status === 'reserved';
    const isCurrentUserTable = currentUserReservation?.tableId === item.id;
    return (
      <TouchableOpacity 
        style={[
          styles.table, 
          selectedTable && selectedTable.id === item.id && styles.selectedTable,
          isOccupied && styles.tableOccupied 
        ]} 
        onPress={() => handleTableSelect(item)}
        disabled={item.status === 'reserved'}
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
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Table: {selectedTable?.name}({selectedTable?.id})</Text>
            <Text style={styles.modalText}>{selectedTable?.message}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

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
  selectedTable: {
    borderColor: 'blue', // Or any highlight color you prefer
    borderWidth: 3,        // Adjust the width as needed
    borderRadius: 10,      // Should match your existing `table` style
    // You can add other styles to indicate selection
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default TableManagementScreen;
