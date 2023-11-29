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
  const [ingredients, setingredients] = useState("");
  const [person, setperson] = useState("");
  const [duration, setduration] = useState("");
  const [categoryid, setcategoryid] = useState("");

  const handleValueChange = async (foodItem) => {
    if (foodItem != "Add New") {
      const food = foods.find((food) => food.name === foodItem);
      if (food) {
        setitemName(foodItem);
        setItemPrice(food.price);
        setitemdescription(food.details);
        setingredients(food.ingredients);
        const person = food.person.toString();
        setperson(person);
        setduration(food.duration);
        const categoryid = food.categoryid.toString();
        setcategoryid(categoryid);
        console.log(itemName);
      } else {
        console.log("no item found");
      }
    } else {
      setitemName("");
      setItemPrice("");
      setitemdescription("");
      setingredients("");
      setperson("");
      setduration("");
      setcategoryid("");
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
        ingredients: ingredients,
        person: person,
        duration: duration,
        categoryid: categoryid,
      };

      console.log(updateditem);
    } else {
      console.log("Add new item");
      const newid = foods.length + 1;
      const newitem = {
        id: newid,
        name: itemName,
        ingredients: ingredients,
        price: itemPrice,
        person: person,
        duration: duration,
        categoryid: categoryid,
        details: itemdescription,
      };

      console.log(newitem);
      foods.push(newitem);
      foodItems123.push(newitem.name);
    }

    navigation.navigate("Manager_home");
  };

  const handleDelete = () => {
    // Logic to delete item, update database, etc.
    const food = foods.find((food) => food.name === itemName);
    if (food) {
      const index = foods.indexOf(food);

      foods.splice(index, 1);
      foodItems123.splice(index, 1);
      const ids = foods.map((food) => food.id);

      for (let i = index + 2; i < ids.length + 2; i++) {
        console.log(i);
        foods[i - 2].id = i - 1;
      }
    }
  };

  return (
    <ScrollView style={{ marginLeft: 20, marginTop: 20 }}>
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
        placeholder="Ingredientes"
        value={ingredients}
        onChangeText={setingredients}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Person"
        value={person}
        onChangeText={setperson}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Duration"
        value={duration}
        onChangeText={setduration}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="categoryid"
        value={categoryid}
        onChangeText={setcategoryid}
        style={styles.TextInput}
      />

      <TextInput
        placeholder="Item details"
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
      <Button title="Delete" style={styles.save} onPress={handleDelete} />
    </ScrollView>
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
