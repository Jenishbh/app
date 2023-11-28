import React ,{useState}from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../database/firebase'; // Ensure you import your database correctly

const BufferScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = useState([]);
  const [udata, setudata] = useState([])
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



  const handleDone = async () => {
    // Remove reservation from client and table side
    try {
      // Example: Remove reservation code here
      //keeping user side reservation as it is
      //await db.collection('UserData').doc(udata.email).collection('Reservation').doc(udata.reservationId).delete();
      await db.collection('Tables').doc(udata.tableRef).collection('Reservation').doc(udata.reservationId).delete();
      // Clear the relevant AsyncStorage
      await AsyncStorage.removeItem('@UserStorage');
      await AsyncStorage.removeItem('@FoodStorage');

      // Navigate to the desired screen after the checkout process
      navigation.navigate('Manager_home'); // Change 'HomeScreen' to your home screen route name
    } catch (error) {
      console.error('Checkout process failed', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Green tick animation */}
      <LottieView
        source={require('../../assets/green_tick.json')} // Replace with your tick animation file
        autoPlay
        loop
        style={styles.animation}
      />
      {/* Background celebration animation */}
      <LottieView
        source={require('../../assets/celibration.json')} // Replace with your celebration animation file
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />
      <TouchableOpacity style={styles.button} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
// Adjust the size as needed
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    marginTop: 420,
    backgroundColor: '#34A853', // A green color for the button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BufferScreen;
