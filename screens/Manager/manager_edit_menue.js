import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, ActivityIndicator , KeyboardAvoidingView, Platform  } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../database/firebase';
import RNPickerSelect from 'react-native-picker-select';
import { async } from '@firebase/util';


const ManagerEditMenu = ({ route, navigation }) => {
  const initialFood = route.params || {};
  const [foodDetails, setFoodDetails] = useState(initialFood);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categorySnapshot = await db.collection('Category').get();
        const fetchedCategories = categorySnapshot.docs.map(doc => ({
          label: doc.data().name,
          value: doc.id
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch categories.");
      }
      setLoading(false);
    };


    fetchCategories();
  }, []);
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

 
  const handleSave = async () => {
    if (foodDetails.image && !foodDetails.image.startsWith('http')) {
      const blob = await (await fetch(foodDetails.image)).blob();
      const storageRef = storage.ref().child('food/' + `image_${Date.now()}`);
      const uploadTask = await storageRef.put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      setFoodDetails({ ...foodDetails, image: downloadURL });
    }
    
    // Save or update the food item
    const foodDocRef = db.collection('Menu').doc(foodDetails.name);
    const method = foodDetails.id ? 'update' : 'set';
    await foodDocRef[method]({ ...foodDetails, id: foodDetails.id || Date.now() });
    
    Alert.alert("Success", `Food item ${foodDetails.id ? 'updated' : 'added'} successfully!`);
    navigation.goBack();
  };
  
  const handleImageUpload = async (uri) => {
    try {
      
      const response = await fetch(uri.uri);
      const blob = await response.blob();
      const storageRef = storage.ref().child('food/' + `image_${Date.now()}`);
      const uploadTask = await storageRef.put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      console.log(downloadURL)
      // Update the foodDetails with the new image URL
      setFoodDetails({ ...foodDetails, image: downloadURL });
  
      // Proceed to save or update the food item details
      saveOrUpdateFoodItem();
    } catch (error) {
      console.error("Error during the image upload process: ", error);
      Alert.alert('Error', 'Failed to upload image: ' + error.message);
    }
  };
  
  const saveOrUpdateFoodItem = async () => {
    try {
      // Reference to the document with the name as the key
      const foodDocRef = db.collection('Menu').doc(foodDetails.name);
  
      if (foodDetails.id) {
        // Update existing food item
        await foodDocRef.update(foodDetails);
        Alert.alert("Food Updated", "The food item has been updated successfully!");
      } else {
        // Add new food item
        await foodDocRef.set({ ...foodDetails, id: foodDetails.name }); // Assuming name is unique
        Alert.alert("Food Added", "A new food item has been added successfully!");
      }
    } catch (error) {
      console.error("Error in saveOrUpdate the food") }

    }
  
  

  const handleDelete = async () => {
    try {
      if (foodDetails.image && foodDetails.image.startsWith('http')) {
        const imageRef = storage.refFromURL(foodDetails.image);
        console.log(imageRef)
        await imageRef.delete();
      }
      
      await db.collection('Menu').doc(foodDetails.name).delete();
      Alert.alert("Food Deleted", "The food item has been deleted successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", "Failed to delete the food item.");
    }
  };
  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }
  
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
    <ScrollView style={styles.container}>
       <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        
      <Image source={{ uri: foodDetails.image }} style={styles.image} />

      </TouchableOpacity>

      <TextInput
        placeholder="Food Name"
        value={foodDetails.name}
        onChangeText={text => handleChange('name', text)}
        style={styles.input}
      />
        <RNPickerSelect
          onValueChange={(value) => setFoodDetails({ ...foodDetails, category: value })}
          items={categories}
          style={styles.picker}
          placeholder={{ label: 'Select a category', value: null }}
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
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical:34
    
    
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
picker:{
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 15,
  marginBottom: 20,
  borderRadius: 10,
  fontSize: 16,
  backgroundColor: '#f7f7f7',
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