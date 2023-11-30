import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AssignTable = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
  };

  const storeUserDetails = async () => {
    try {
      const userDetails = JSON.stringify({ name, email, guests, date: formatDate(selectedDate) });
      await AsyncStorage.setItem('@UserStorage', userDetails);
      navigateToTableSelection();
    } catch (e) {
      Alert.alert('Error', 'Failed to store user details.');
    }
  };

  const navigateToTableSelection = () => {
    navigation.navigate('TableSelectionScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Customer Check-In</Text>

        <TextInput
          placeholder='Enter Name'
          onChangeText={setName}
          value={name}
          style={styles.input}
        />

        <TextInput
          placeholder='Enter Email'
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />

        <TextInput
          placeholder='Number of Guests'
          onChangeText={setGuests}
          value={guests}
          keyboardType='number-pad'
          style={styles.input}
        />

        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text>{selectedDate ? formatDate(selectedDate) : 'Select Date and Time'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='datetime'
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TouchableOpacity onPress={storeUserDetails} style={styles.button}>
          <Text style={styles.buttonText}>Proceed to Table Selection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  dateButton: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AssignTable;
