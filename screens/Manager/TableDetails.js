import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Animated, PanResponder, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/MaterialIcons';

const TableDetailsScreen = ({ navigation, route}) => {

  const routa = route.params
  const item = routa.reserved[0]
  const [countdowns, setCountdowns] = useState({});

  const foodDetails = item.foodDetails.map(food => {
    return{
      name: food.name,
      price: food.salePrice,
      qty: food.qty,
      id: food.id,
      duration: food.duration,
      orderTime: item.orderTime,
      checked: food.checked,

    }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
  
      foodDetails.forEach(item => {
        if (item.orderTime && item.duration) {
          
          newCountdowns[item.id] = calculateRemainingTime(item.orderTime, item.duration);
        } else {
          console.log('Missing data for item:', item);
          newCountdowns[item.id] = 'Data missing';
        }
      });
  
      setCountdowns(newCountdowns);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [foodDetails]);
  
  
  
  

  

  const createPanResponder = (itemId) => {
    const pan = new Animated.ValueXY();
  
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: 0 });
        pan.setValue({ x: 0, y: 0 }); // Initial value
      },
      onPanResponderMove: Animated.event([
        null, { dx: pan.x, dy: 0 }
      ], { useNativeDriver: false }), // Only horizontal movement
      onPanResponderRelease: () => {
        pan.flattenOffset();
        // You can add logic here to handle the end of the swipe
        // For example, if the item is swiped a certain distance, perform an action
      },
    });
  };
  
  const calculateRemainingTime = (orderTime, duration) => {
    const orderTimea = orderTime || []
    if (!orderTimea || !duration || typeof orderTimea !== 'string' || typeof duration !== 'string') {
      console.warn('Invalid input for calculateRemainingTime:', { orderTimea, duration });
      return 'Invalid data';
    }
    
    const orderTimeParts = orderTimea.split(":");
    if (orderTimeParts.length !== 3) {
      console.warn('Invalid orderTime format:', orderTimea);
      return 'Invalid orderTime';
    }
  
    const orderHour = parseInt(orderTimeParts[0]);
    const orderMinute = parseInt(orderTimeParts[1]);
    const orderSecond = parseInt(orderTimeParts[2]);
  
    const now = new Date();
    const orderDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), orderHour, orderMinute, orderSecond);
  
    const durationInMinutes = parseInt(duration.split(" ")[0]);
    if (isNaN(durationInMinutes)) {
      console.warn('Invalid duration format:', duration);
      return 'Invalid duration';
    }
  
    const durationInMilliseconds = durationInMinutes * 60 * 1000;
    const endTime = new Date(orderDateTime.getTime() + durationInMilliseconds);
    const timeLeft = endTime.getTime() - now.getTime();
  
    if (timeLeft <= 0) {
      return 'Overdue';
    }
  
    const minutesLeft = Math.floor(timeLeft / 60000);
    const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
  
    return `${minutesLeft}m ${secondsLeft}s`;
  };
  

  const handleaddfood =()=>{
    navigation.navigate('Menucard')
  }
  const renderFoodItem = (item) => {
    const pan = new Animated.ValueXY();
    const panResponder = createPanResponder(item.id).panHandlers;
    const remainingTime = countdowns[item.id] || 'Calculating...';
    
    let backgroundColor;

    // Color coding based on the remaining time
    if (remainingTime === 'Overdue') {
      backgroundColor = '#ff4d4d'; // Red for overdue
    } else if (remainingTime !== 'Calculating...' && parseInt(remainingTime.split('m')[0]) < 10) {
      backgroundColor = '#ffcc00'; // Yellow for less than 10 minutes
    } else {
      backgroundColor = 'lightgreen'; // Green otherwise
    }

    return (
      <View key={item.id} style={[styles.foodItem, { backgroundColor }]}>
        
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
        <Text style={styles.logotxt}>{item.Table}</Text>
      </View>

      {/* Table Details */}
      <View style={styles.tableDetailsContainer}>
        <Text style={styles.qrText}>Email: {item.user}</Text>
        
      </View>

      {/* Food Items List */}
      {foodDetails.map(renderFoodItem)}

      {/* Add Complimentary Item Button */}
      <TouchableOpacity style={styles.addItemRow} onPress={handleaddfood} >
        
        <Icon name="plus" size={20} color="#000" />
        <Text style={styles.addFoodText}>Add Complimentary Item</Text>
      </TouchableOpacity>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton} >
        <Text style={styles.checkoutButtonText}>Done</Text>
        
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
    padding: 60,
  },
  qrCode: {
    width: 180,
    height: 180,
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
