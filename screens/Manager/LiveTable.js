import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { db } from '../../database/firebase'; // Adjust the path as needed



const ManagerScreen = ({navigation}) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    let isMounted = true; // To handle component unmount
  
    const fetchData = async () => {
      const fetchedTables = [];
      const snapshot = await db.collection('Tables').get();
  
      for (const doc of snapshot.docs) {
        const tableData = { id: doc.id, ...doc.data() };
        const reservationsSnapshot = await doc.ref.collection('Reservation').get();
        tableData.Reservation = reservationsSnapshot.docs.map(resDoc => ({
          id: resDoc.id,
          ...resDoc.data()
        }));
        
        fetchedTables.push(tableData);
      }
  
      if (isMounted) {
        setTables(fetchedTables);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false; // Set it to false when the component unmounts
    };
  }, []);
  


  
  



  const occupiedTables = tables.filter(table => 
    table.Reservation.some(res => res.status === 'confirmed')
  );
  

  const renderTableItem = ({ item }) => {
    // Determine if the table is occupied
    const isOccupied = item.Reservation.map(rese => rese.status === 'confirmed').some(value => value === true);
    const reserved = item.Reservation.filter(res => res.status === 'confirmed' )
    return (
      <TouchableOpacity
        style={[styles.tableCard, isOccupied ? styles.occupied : styles.available]}
        onPress={() => navigation.navigate('TableDetailsScreen', { reserved })}
      >
        <Text style={styles.tableCardTitle}>{item.name} (ID: {item.id})</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Check if tables data is available */}
      {tables.length > 0 ? (
        <>
          <Text style={styles.sectionHeader}>Occupied Tables</Text>
          <FlatList
            data={occupiedTables}
            renderItem={renderTableItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Text>No occupied tables.</Text>}
          />


        </>
      ) : (
        <Text>Loading tables...</Text>
      )}
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background for the overall screen
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // White background for headers
    color: '#333333', // Dark text for readability
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dddddd', // Light border for subtle separation
    marginTop: 10,
  },
  tableCard: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 6, // Dynamic height based on screen size
    backgroundColor: '#ffffff', // White background for cards
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333', // Dark text for contrast
  },
  occupied: {
    backgroundColor: '#ffcccb', // Light red for occupied tables
  },
  available: {
    backgroundColor: '#d0f0c0', // Light green for available tables
  },
  noTablesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666666', // Grey text for empty sections
    marginTop: 20,
  },
});

export default ManagerScreen;
