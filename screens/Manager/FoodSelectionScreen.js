import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

const Checkout = ({ navigation, route }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [udata, setudata] = useState([])
  const [splitReceipt, setSplitReceipt] = useState(false);
  const [selectedTipPercentage, setSelectedTipPercentage] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const item = route.params
  

  useFocusEffect(
    React.useCallback(() => {
      fetchDataAndStore();
      return () => {};
    }, [])
  );
    
  const fetchDataAndStore = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('@FoodStorage');
      const data = await AsyncStorage.getItem('@UserStorage') 
      setudata(JSON.parse(data))
      
      if (storedCartItems !== null) {
        setFoodItems(JSON.parse(storedCartItems));
      } else {
          setFoodItems([]); // Handle case where fetched data is empty
        }
      }
     catch (error) {
      console.error('Failed to fetch or store data', error);
      Alert.alert('Error', 'Failed to load data');
    }
  };


  // Calculate the total
  const subtotal = foodItems.reduce((acc, item) => item.checked ? acc + parseFloat(item.salePrice) : acc, 0);
  const tipAmount = selectedTipPercentage ? subtotal * (selectedTipPercentage / 100) : parseFloat(customTip) || 0;
  const total = subtotal + tipAmount;
  // Function to handle checking/unchecking items
  const toggleCheckItem = (itemId) => {
    setFoodItems(foodItems.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item));
  };

  // Function to handle the checkout process
  const handleCheckout = () => {
    // Handle the checkout process
    // Placeholder function, implement as needed\
    navigation.navigate('CheckoutScreen');
  };


  const handleAddFoodItem = () => {
    navigation.navigate('ManagerMenu');
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const storedCart = await AsyncStorage.getItem('@FoodStorage');
      let cartItems = storedCart ? JSON.parse(storedCart) : [];

      cartItems = cartItems.filter(item => item.id !== itemId);

      await AsyncStorage.setItem('@FoodStorage', JSON.stringify(cartItems));
      setFoodItems(cartItems);
  } catch (error) {
      console.error("Error deleting item from cart", error);
  }
  }
  const CreateQR=()=>{
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
    return(
      <QRCode 
           value={JSON.stringify([item.user,item.reservationId])}
          
           logoSize={30}
           logoBackgroundColor='transparent'
           />
    )
  }

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
        <Text style={styles.qrText}>{udata.tableType}({udata.tableId})</Text>
      </View>
      <View style={styles.card}>
      {/* Food Items List */}
      {foodItems.map(item => {
        if (!item) return null;
        return (

        <TouchableOpacity key={item.id} style={styles.foodItem} onPress={() => toggleCheckItem(item.id)}>
          <Icon name={item.checked ? 'check-circle' : 'circle-thin'} size={24} color="#000" />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.salePrice}</Text>
          <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <Icona name="delete" size={24} color="#000" />
      </TouchableOpacity>
        </TouchableOpacity>
        )})}
      <TouchableOpacity style={styles.addItemRow} onPress={handleAddFoodItem}>
          <Icon name="plus" size={20} color="#000" />
          <Text style={styles.addFoodText}>Add Food Item</Text>
        </TouchableOpacity>




    </View>
      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  }
});

export default Checkout;