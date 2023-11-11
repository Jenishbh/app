import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const CheckoutScreen = ({ navigation, route }) => {
  const [foodItems, setFoodItems] = useState([]);
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
      if (storedCartItems !== null) {
        setFoodItems(JSON.parse(storedCartItems));
      } else {
        const fetchedData = await fetchDataFromDatabase();
        if (fetchedData && fetchedData.length > 0) {
          await AsyncStorage.setItem('@FoodStorage', JSON.stringify(fetchedData));
          setFoodItems(fetchedData);
        } else {
          setFoodItems([]); // Handle case where fetched data is empty
        }
      }
    } catch (error) {
      console.error('Failed to fetch or store data', error);
      Alert.alert('Error', 'Failed to load data');
    }
  };

  const fetchDataFromDatabase = async () => {
    // Replace this with your actual data fetching logic
    const data ={
      id: item.food.id
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
    // Placeholder function, implement as needed
  };


  // Function to handle tip selection
  const handleSelectTip = (percentage) => {
    if (percentage === selectedTipPercentage) {
      // If the same percentage is clicked again, unselect it
      setSelectedTipPercentage(null);
    } else {
      setSelectedTipPercentage(percentage);
      setCustomTip(''); // Reset custom tip when a preset is selected
    }
  };

  // Function to handle custom tip input
  const handleCustomTip = (value) => {
    setCustomTip(value);
    setSelectedTipPercentage(null); // Reset tip percentage when custom is entered
  };

  const handleAddFoodItem = () => {
    navigation.navigate('ManagerMenu');
  };


  return (
    <ScrollView style={styles.container}>
      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <Image style={styles.qrCode} source={require('../../assets/third.png')} />
        <Text style={styles.qrText}>Jenish Patel</Text>
      </View>

      {/* Split Receipt Toggle */}
      <View style={styles.splitReceiptContainer}>
        <Text style={styles.splitReceiptText}>Table: </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={splitReceipt ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setSplitReceipt(previousState => !previousState)}
          value={splitReceipt}
        />
      </View>
      <View style={styles.card}>
      {/* Food Items List */}
      {foodItems.map(item => (
        <TouchableOpacity key={item.id} style={styles.foodItem} onPress={() => toggleCheckItem(item.id)}>
          <Icon name={item.checked ? 'check-circle' : 'circle-thin'} size={24} color="#000" />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.salePrice}</Text>
          <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
        <Icona name="delete" size={24} color="#000" />
      </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addItemRow} onPress={handleAddFoodItem}>
          <Icon name="plus" size={20} color="#000" />
          <Text style={styles.addFoodText}>Add Food Item</Text>
        </TouchableOpacity>

    {/* Add Tips Section */}
    <View style={styles.tipsContainer}>
      {[5, 10, 15].map((percentage) => (
        <TouchableOpacity
          key={percentage}
          style={[
            styles.tipButton,
            selectedTipPercentage === percentage && styles.tipButtonSelected
          ]}
          onPress={() => handleSelectTip(percentage)}
        >
          <Text style={styles.tipText}>{percentage}%</Text>
        </TouchableOpacity>
      ))}
      <TextInput
        style={styles.customTipInput}
        value={customTip}
        onChangeText={handleCustomTip}
        placeholder="Custom"
        keyboardType="numeric"
      />
    </View>

    {/* Total Section */}
    <View style={styles.subtotalContainer}>
      <View style={styles.separator} />
      <View style={styles.subtotalRow}>
        <Text style={styles.totalText}>Subtotal</Text>
        <Text style={styles.totalText}>{subtotal.toFixed(2)} SAR</Text>
      </View>
    </View>

    {/* Tip and Total Section */}
    <View style={styles.subtotalRow}>
      <Text style={styles.totalText}>Tip: </Text>
      <Text style={styles.totalText}>{tipAmount.toFixed(2)} SAR</Text>
    </View>
    <View style={styles.subtotalRow}>
      <Text style={styles.totalText}>Total: </Text>
      <Text style={styles.totalText}>{total.toFixed(2)} SAR</Text>
    </View>
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
    width: 150,
    height: 150,
    marginBottom: 10,
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
});

export default CheckoutScreen;