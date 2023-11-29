import { Header } from "@react-navigation/stack";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Table from "../Menu/Table.js";

const tablesnames = Table.map((table) => table.name);

const AssignTable = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const [table, setTable] = useState();
  const handleValueChange = async (itemValue, itemIndex) => {
    setTable(itemValue);
    await AsyncStorage.setItem("Atable", itemValue);
  };

  const handleSubmit = async () => {
    const Table = await AsyncStorage.getItem("Atable");
    // if (table === Table) {
    //   alert("Table already assigned");
    //   return;
    // }

    console.log(Name);
    console.log(Email);
    console.log(Table);
    console.log(table);
    //tables.splice(tables.indexOf(table), 1);
    const time = new Date();
    console.log(time);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Assign Table</Text>

      <TextInput
        placeholder="Enter Name"
        onChangeText={(Name) => setName(Name)}
        defaultValue={Name}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Email"
        onChangeText={(Email) => setEmail(Email)}
        defaultValue={Email}
        style={styles.input}
      />

      <Picker
        selectedValue={table}
        style={styles.select}
        onValueChange={handleValueChange}
      >
        {tablesnames.map((table) => (
          <Picker.Item key={table} label={table} value={table} />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={() => {
          handleSubmit();
        }}
        style={styles.button}
      >
        <Text style={styles.text}>Assign</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    top: 0,
    borderRadius: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  select: {
    width: 300,
    height: 50,
  },
  button: {
    backgroundColor: "#5C4742",
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    height: 80,
    width: 150,
    bottom: 20,
    right: 20,
  },
  text: {
    fontSize: 30,
    color: "#5FA5B5",
    textAlign: "center",
  },
});

export default AssignTable;
