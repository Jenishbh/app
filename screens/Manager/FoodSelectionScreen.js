import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, PanResponder, Animated  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../../database/firebase';


const Checkout = ({ navigation}) => {
  const [foodItems, setFoodItems] = useState([]);
  const [udata, setudata] = useState([])

  

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataAndStore = async () => {
        try {
          const storedCartItems = await AsyncStorage.getItem('@FoodStorage');
          const storedUdata = await AsyncStorage.getItem('@UserStorage');
  
          if (storedCartItems !== null) {
            const foodItemsArray = JSON.parse(storedCartItems);
            // Calculate total price for each item immediately when setting the state
            const foodItemsWithTotalPrice = foodItemsArray.map(item => {
              const totalPrice = (item.qty * parseFloat(item.salePrice)).toFixed(2);
              return { ...item, totalPrice }; // Now, every item will have a totalPrice property
            });
            setFoodItems(foodItemsWithTotalPrice);
            
          } else {
            setFoodItems([]); // Set an empty array if no food items are stored
          }
  
          if (storedUdata !== null) {
            setudata(JSON.parse(storedUdata));
          } else {
            setudata({}); // Set a default object if no user data is stored
          }
  
        } catch (error) {
          console.error('Failed to fetch data from AsyncStorage', error);
        }
      };
  
      fetchDataAndStore();
    }, [])
  );
  
  
  const updateFoodItemsInAsyncStorage = async (newFoodItems) => {
    try {
      await AsyncStorage.setItem('@FoodStorage', JSON.stringify(newFoodItems));
      setFoodItems(newFoodItems);
    } catch (error) {
      console.error("Error updating food items in AsyncStorage", error);
    }
  };
  

  // Calculate the total

  // Function to handle checking/unchecking items
  const toggleCheckItem = (itemId) => {
    setFoodItems(foodItems.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item));
  };

  // Function to handle the checkout process
  const handleCheckout = async () => {
    try {
      // Assuming 'udata' is an object containing the 'email' and 'reservationID'
      // and 'foodItems' is the array of items to be saved in the 'foodDetails' field
      const reservationRef = db.collection('UserData')
        .doc(udata.email) // Make sure 'udata.email' contains the user's email
        .collection('Reservation')
        .doc(udata.reservationId); // Make sure 'udata.reservationID' contains the reservation ID
  
      await reservationRef.update({
        foodDetails: foodItems.map(item => ({
           checked: 1,// Assuming 'checked' is a boolean in your state
          id: item.id,
           // Assuming 'image' is the correct field you want to save
          name: item.name,
          qty: item.qty,
          salePrice: item.salePrice,
        })),
       
      });

      navigation.navigate('CheckoutScreen'); // Use the correct screen name


    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle the error, maybe show an alert to the user
    }
  };


  const handleAddFoodItem = () => {
    navigation.navigate('ManagerMenu');
  };

  const handleDeleteItem = async (itemId) => {
    const newFoodItems = foodItems.filter(item => item.id !== itemId);
    updateFoodItemsInAsyncStorage(newFoodItems);
  };

  const handleSwipe = (itemId, isIncrement) => {
    const newFoodItems = foodItems.map(item => {
      if (item.id === itemId) {
        let newQty = item.qty;
        if (isIncrement) {
          newQty += 1;
        } else if (!isIncrement && item.qty > 1) {
          newQty -= 1;
        }
        const newTotalPrice = (newQty * parseFloat(item.salePrice)).toFixed(2);
        return { ...item, qty: newQty, totalPrice: newTotalPrice };
      }
      return item;
    });
    setFoodItems(newFoodItems);
    updateFoodItemsInAsyncStorage(newFoodItems);
  };
const createPanResponder = (itemId) => {
  const pan = new Animated.Value(0);
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < 0) {
        // Swipe up
        handleSwipe(itemId, true);
      } else if (gestureState.dy > 0) {
        // Swipe down
        handleSwipe(itemId, false);
      }
      Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
    },
  });
};





  return (
    <ScrollView style={styles.container}>
      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <Image style={styles.qrCode} source={require('../../assets/third.png')} />
        <Text style={styles.logotxt}>ORDER</Text>
      </View>

      {/* Split Receipt Toggle */}
      <View style={styles.splitReceiptContainer}>
      <Text style={styles.qrText}>Name: </Text>
        <Text style={styles.qrText}>{udata.name}</Text>
      </View>
      <View style={styles.splitReceiptContainer}>
      <Text style={styles.qrText}>Table: </Text>
        <Text style={styles.qrText}>{udata.Table_Type}({udata.tableID})</Text>
      </View>
      <View style={styles.card}>
      {/* Food Items List */}
      {foodItems.map(item => {
        if (!item) return null;
        const panResponder = createPanResponder(item.id).panHandlers;
        const pan = new Animated.ValueXY();
        return (
          <View key={item.id} style={styles.foodItem}>
            <TouchableOpacity onPress={() => toggleCheckItem(item.id)}>
            <Icon name={item.checked ? 'check-circle' : 'circle-thin'} size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.itemName}>{item.name}</Text>
            <Animated.View {...panResponder} style={[styles.swipeable, {
              transform: [{ translateY: pan.y }]
            }]}>
              <Text style={styles.qtyText}>{item.qty}</Text>
            </Animated.View>
            <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>{item.salePrice}</Text>
            <Text style={styles.itemTotalPrice}>{`${item.qty}x $${item.totalPrice}`}</Text>
            </View>
            <TouchableOpacity style={{left:10}} onPress={() => handleDeleteItem(item.id)}>
              <Icona name="delete" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )})}

      <TouchableOpacity style={styles.addItemRow} onPress={handleAddFoodItem}>
          <Icon name="plus" size={20} color="#000" />
          <Text style={styles.addFoodText}>Add Food Item</Text>
        </TouchableOpacity>




    </View>
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
    backgroundColor: '#FFF',
  },
  qrContainer: {
    alignItems: 'center',
    margin: 20,
  },
  qrCode: {
    width: 180,
    height: 180,
    marginBottom: 0,
  },
  qrText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  addItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  addFoodText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  splitReceiptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  splitReceiptText: {
    fontSize: 16,
    color: '#333',
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  itemPrice: {
    fontSize: 16,
  },
  totalContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical:8

    
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    marginBottom: 10,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tipButton: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 18,
  },
  tipButtonSelected: {
    backgroundColor: '#34A853', // Highlight color for selected tip
  },
  tipText: {
    fontSize: 16,
  },
  customTipInput: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 10,
    borderRadius: 20,
    width: 100,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#34A853', // A green color for the checkout button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,

  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logotxt:{
    color: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical:5
  },
  swipeable: {
    height: 60, // Set a fixed height
    width: 60, // Set a fixed width
    borderRadius: 10, // Optional: if you want rounded corners
      // Optional: if you want background color
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Add space from the sides
    
  },
qtyText:{
  fontSize: 16,   
},
priceContainer: {
  alignItems: 'flex-end', // Align the text to the right
  flex: 1,
},
itemTotalPrice: {
  fontSize: 14,
  color: 'grey',
},
});

export default Checkout;