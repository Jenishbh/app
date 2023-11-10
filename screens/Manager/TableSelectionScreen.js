import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2; // You can adjust this based on your layout preference
const tileSize = screenWidth / numColumns - 20; // Adjust tile size based on screen width and desired margin

const TableSelectionScreen = ({ navigation, route }) => {
    // ... existing logic ...

    // ... existing renderItem function ...
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        // Fetch tables data and set it
        // This is dummy data, replace it with actual data fetching
        const fetchedTables = [
            { id: 1, status: 'available' },
            { id: 2, status: 'occupied' },
            { id: 3, status: 'available' },
            // ... more tables ...
        ];
        setTables(fetchedTables);
    }, []);

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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.table,
                item.status !== 'available' && styles.tableOccupied,
                item.id === selectedTable && styles.tableSelected,
            ]}
            onPress={() => handleTableSelect(item)}
            disabled={item.status !== 'available'}
        >
            <Text style={styles.tableText}>Table {item.id}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Table</Text>
            <FlatList
                data={tables}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.listContent}
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
        paddingTop: 20,
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
        fontSize: 16,
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
