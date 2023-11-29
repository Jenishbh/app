import React, { useState } from "react";
import { SafeAreaView, Text, Button, TextInput, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import foods from "../Menu/Items.js";
import { NavigationContainer } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Manager_home from "./manager_home.js";

let foodItems123 = foods.map((food) => food.name);
foodItems123.push("Add New");

const Manager_edit_menue = ({ navigation }) => {
  const [itemName, setitemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemdescription, setitemdescription] = useState("");

  const handleValueChange = async (foodItem) => {
    if (foodItem != "Add New") {
      const food = foods.filter((food) => food.name === foodItem);
      setitemName(foodItem);
      setItemPrice(food[0].price);
      setitemdescription(food[0].details);
      console.log(itemName);
    } else {
      setitemName("");
      setItemPrice("");
      setitemdescription("");
      console.log("Add new item");
    }
  };

  const handleSave = () => {
    // Logic to save changes, update database, etc.
    const food = foods.find((food) => food.name === itemName);
    if (food) {
      const updateditem = {
        ...food,
        price: itemPrice,
        details: itemdescription,
      };

      console.log(updateditem);
    } else {
      console.log("Add new item");
    }

    navigation.navigate("Manager_home");
  };

  return (
    <SafeAreaView style={styles.containeer}>
      <Text>Select Item or add New</Text>
      <Picker
        selectedValue={itemName}
        style={styles.select}
        onValueChange={handleValueChange}
      >
        {foodItems123.map((foodItem) => (
          <Picker.Item key={foodItem} label={foodItem} value={foodItem} />
        ))}
      </Picker>
      <Image source={require("../../assets/add.png")} style={styles.image} />
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setitemName}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Item price"
        value={itemPrice}
        onChangeText={setItemPrice}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Item Description"
        value={itemdescription}
        onChangeText={setitemdescription}
        multiline={true}
        style={{
          height: 100,
          textAlignVertical: "top",
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
        }}
      />

      <Button title="Save" style={styles.save} onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containeer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
  },
  image: {
    width: 100,
    height: 100,
    paddingBottom: 20,
    paddingTop: 20,
  },
  TextInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  save: {
    width: 100,
    height: 100,
    paddingBottom: 20,
  },
  select: {
    width: 300,
    height: 200,
  },
});

export default Manager_edit_menue;
