import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { categories, foods } from '../Menu/food'; // Adjust the path as needed
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../database/firebase';
const ManagerEditMenu = ({ route, navigation }) => {
  const initialFood = route.params || {};
  const [foodDetails, setFoodDetails] = useState(initialFood);
  
  const handleChange = (name, value) => {
    setFoodDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImageUpload(result.assets[0]);
      
    }
  };

 
  const handleImageUpload = async (uri) => {
    try {
      
      const response = await fetch(uri.uri);
      
      
      const blob = await response.blob();
      
      const storageRef = storage.ref().child('food/' + `image_${Date.now()}`);
      
      const uploadTask = await storageRef.put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      console.log(downloadURL)
      updateFirestoreImageLink(downloadURL);
    } catch (error) {
      console.error("Error during the image upload process: ", error);
      Alert.alert('Error', 'Failed to upload image: ' + error.message);
    }
  };
  
  
  const updateFirestoreImageLink = async (downloadURL) => {
    try {
      await db.collection('Menu').doc(foodDetails.name).update({ image: downloadURL });
      setFoodDetails({ ...foodDetails, image: downloadURL });
      Alert.alert('Success', 'Image updated successfully.');
    } catch (error) {
      console.error("Error updating Firestore: ", error);
      Alert.alert('Error', 'Failed to update image in Firestore.');
    }
  };
  const handleSave = async () => {
    if (foodDetails.id) {
      // Update existing food
      const foodDocRef = db.collection('Menu').doc(foodDetails.name);
      await foodDocRef.update(foodDetails);
      // Update your backend/database here
      Alert.alert("Food Updated", "The food item has been updated successfully!");
    } else {
      // Add new food
      const newFood = { ...foodDetails, id: foodDetails.length + 1 };
      foods.push(newFood); // Update your backend/database here
      Alert.alert("Food Added", "A new food item has been added successfully!");
    }
    navigation.goBack();
  };

  const handleDelete = async () => {
    try {
      // Delete from Firestore
      await db.collection('Menu').doc(foodDetails.id).delete();
  
      // Update your local state if necessary
      // For example, if you're maintaining a list of food items in the state
      const updatedFoods = foods.filter(food => food.id !== foodDetails.id);
      setFoods(updatedFoods);
  
      Alert.alert("Food Deleted", "The food item has been deleted successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error deleting food item: ", error);
      Alert.alert("Error", "Failed to delete the food item.");
    }
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        
      <Image source={{ uri: foodDetails.image }} style={styles.image} />

      </TouchableOpacity>

      <TextInput
        placeholder="Food Name"
        value={foodDetails.name}
        onChangeText={text => handleChange('name', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredients"
        value={foodDetails.ingredients}
        onChangeText={text => handleChange('ingredients', text)}
        
        style={[styles.input,]}
      />
      <TextInput
        placeholder="Price"
        value={String(foodDetails.price)} 
        onChangeText={text => handleChange('price', text)}
        keyboardType='numeric'
        style={styles.input}
      />
      <TextInput
        placeholder="Duration"
        value={foodDetails.duration}
        onChangeText={text => handleChange('duration', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Details"
        value={foodDetails.details}
        onChangeText={text => handleChange('details', text)}
        multiline
        style={[styles.input, styles.multiLineInput]}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Save" onPress={handleSave} color="#4CAF50" />
        </View>
        {foodDetails.id && (
          <View style={styles.button}>
            <Button title="Delete" onPress={handleDelete} color="#F44336" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical:180,
    
  },
  image: {
    height: 180,
        width: 180,
        borderRadius: 30
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },
  multiLineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default ManagerEditMenu;