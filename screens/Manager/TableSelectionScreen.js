import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, SectionList } from 'react-native';
import { db } from '../../database/firebase';
const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // You can adjust this based on your layout preference
const tileSize = screenWidth / numColumns - 20; // Adjust tile size based on screen width and desired margin

const TableSelectionScreen = ({ navigation, route }) => {
    // ... existing logic ...
    const curruntTable = route.params
   
    // ... existing renderItem function ...
    const [tableGroups, setTableGroups] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const unsubscribe = db.collection('Tables')
          .onSnapshot((snapshot) => {
            const tables = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
    
            // Group tables by the 'name' field
            const groups = tables.reduce((acc, table) => {
              const { name } = table;
              if (!acc[name]) {
                acc[name] = [];
              }
              acc[name].push(table);
              return acc;
            }, {});
    
            // Convert groups object into an array suitable for SectionList
            const groupArray = Object.keys(groups).map(name => ({
              title: name,
              data: groups[name],
            }));
    
            setTableGroups(groupArray);
          });
    
        // Detach listener when the component is unmounted
        return () => unsubscribe();
      }, []);
    
        // Detach listener when the component is unmounted
  
    

    const handleTableSelect = (table) => {
        if (table.status === 'available') {
            setSelectedTable(table.id);
        }
    };

    const confirmTableSelection = () => {
        // Logic to confirm table selection
        alert(`Table ${selectedTable} selected`);
        // Navigate back or update state as needed
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      );
    
      const renderItem = ({ item }) => (
        
        <TouchableOpacity
          style={[styles.table, item.size,  item.id === curruntTable.tableID && styles.currentlyBooked,]} 
          
          // Use the 'size' field to determine the style if necessary
          onPress={() => selectTable(item)}
          disabled={item.id === curruntTable.tableID}
        >
            <Text style={styles.tableText}>{item.name}</Text>
            <Text style={styles.tableText}>Size: {item.size}</Text>
        </TouchableOpacity>
      );
    
      const selectTable = (tableId) => {
        // Logic to handle table selection
        console.log(`Table ${tableId} selected`);
        // Perform actions such as updating the reservation with the selected table
      };


    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Select a Table</Text>
            <SectionList
        sections={tableGroups}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    listContent: {
        alignItems: 'center',
    },
    currentlyBooked: {
        backgroundColor: 'red', // Highlight the currently booked table with red color
      },
    table: {
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        height: tileSize,
        width: tileSize,
        margin: 10,
        borderRadius: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    tableOccupied: {
        backgroundColor: '#F44336',
        opacity: 0.6, // Slightly transparent to indicate unavailability
    },
    tableSelected: {
        borderWidth: 3,
        borderColor: '#FFEB3B', // Highlight color for selection
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
});

export default TableSelectionScreen;
