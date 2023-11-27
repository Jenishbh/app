import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/MaterialIcons';

const TableDetailsScreen = ({ udata, foodItems, handleAddComplimentaryItem, handleCheckout }) => {

  const renderFoodItem = (item) => {
    const pan = new Animated.ValueXY();
    const panResponder = createPanResponder(item.id).panHandlers;
    const remainingTime = calculateRemainingTime(item.orderTime, item.duration);
    let backgroundColor;

    // Color coding based on the remaining time
    if (remainingTime === 'Overdue') {
      backgroundColor = '#ff4d4d'; // Red for overdue
    } else if (parseInt(remainingTime.split('m')[0]) < 10) {
      backgroundColor = '#ffcc00'; // Yellow for less than 10 minutes
    } else {
      backgroundColor = '#33cc33'; // Green otherwise
    }

    return (
      <View key={item.id} style={[styles.foodItem, { backgroundColor }]}>
        <TouchableOpacity onPress={() => toggleCheckItem(item.id)}>
          <Icon name={item.checked ? 'check-circle' : 'circle-thin'} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.itemName}>{item.name}</Text>
        <Animated.View {...panResponder} style={[styles.swipeable, { transform: [{ translateY: pan.y }] }]}>
          <Text style={styles.qtyText}>{remainingTime}</Text>
        </Animated.View>
        <TouchableOpacity style={{ left: 10 }} onPress={() => handleDeleteItem(item.id)}>
          <Icona name="delete" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <Image style={styles.qrCode} source={require('../../assets/third.png')} />
        <Text style={styles.logotxt}>ORDER</Text>
      </View>

      {/* Table Details */}
      <View style={styles.tableDetailsContainer}>
        <Text style={styles.qrText}>Name: {item.name}</Text>
        <Text style={styles.qrText}>Table: {item.Table_Type} ({item.tableID})</Text>
      </View>

      {/* Food Items List */}
      {foodItems.map(renderFoodItem)}

      {/* Add Complimentary Item Button */}
      <TouchableOpacity style={styles.addItemRow} onPress={handleAddComplimentaryItem}>
        <Icon name="plus" size={20} color="#000" />
        <Text style={styles.addFoodText}>Add Complimentary Item</Text>
      </TouchableOpacity>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  qrCode: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  logotxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tableDetailsContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff', // Default background, will be overridden
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  swipeable: {
    marginRight: 10,
  },
  qtyText: {
    fontSize: 16,
    color: '#333',
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#e7e7e7',
    margin: 10,
    borderRadius: 8,
  },
  addFoodText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});



export default TableDetailsScreen;
