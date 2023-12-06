import React, { useState, useEffect, setValue } from "react";
import {
  View,
  Switch,
  SafeAreaView,
  StyleSheet,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import TableManagementScreen from "./TableSelectionScreen";
import { db } from "../../database/firebase";


export default function Manager_home({ navigation }) {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    let isMounted = true; // To handle component unmount
  
    const fetchData = async () => {
      const fetchedTables = [];
      const snapshot = await db.collection('Tables').get();
  
      for (const doc of snapshot.docs) {
        const tableData = { id: doc.id, ...doc.data() };
        const reservationsSnapshot = await doc.ref.collection('Reservation').get();
        tableData.Reservation = reservationsSnapshot.docs.map(resDoc => ({
          id: resDoc.id,
          ...resDoc.data()
        }));
        
        fetchedTables.push(tableData);
      }
  
      if (isMounted) {
        setTables(fetchedTables);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false; // Set it to false when the component unmounts
    };
  }, []);
  // This line is already in your code and correctly filters the tables
const occupiedTables = tables.filter(table => 
  table.Reservation.some(res => res.status === 'confirmed')
);

// Count of occupied tables
const occupiedTableCount = occupiedTables.length;

  const buttonClickedHandler = () => {
    console.log("oh !You have press the switch!");
    navigation.navigate("Table_view");
  };

  const [value, setValue] = useState("ON");

  const switchPressed = () => {
    console.log("Switch pressed");
    setValue("OFF");
  };

  const CButton = ({ text }) => {
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.background}>
      <Image
        style={styles.logo}
        source={require("../../assets/table-management.png")}
      />
      <Text style={styles.check_in}> Checked-In </Text>
      <TouchableOpacity
        onPress={()=> navigation.navigate('LiveTable')}
        style={styles.roundButton1}
      >
        <Text style={styles.number}>{occupiedTableCount}/12</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ top: 180 }}
        onPress={() => {
          navigation.navigate("QRScannerScreen");
        }}
      >
        <Image
          source={require("../../assets/qr-code-scan-icon.png")}
          style={styles.scanIcon}
        />
        

      </TouchableOpacity>
      



    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },

  logo: {
    height: 220,
    width: 400,
    top: 70,
  },

  check_in: {
    color: "orange",
    top: 100,
    fontSize: 32,
    alignContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  roundButton1: {
    width: 150,
    height: 150,
    top: 130,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "orange",
  },

  number: {
    color: "black",
    textAlign: "center",
    fontSize: 34,
  },

  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 190,
  },

  onoff: {
    width: 300,
    height: 30,
    color: "grey",
    textAlign: "center",
    fontSize: 12,
  },

  switch: {
    width: 300,
    height: 60,
    color: "white",
    textAlign: "center",
    fontSize: 34,
  },

  button: {
    backgroundColor: "orange",
    padding: 18,
    width: "46%",
    height: 60,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  buttonContainer: {
    top: 220,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  parent1: {
    flex: 1,

    top: 60,
  },
  scanIcon: {
    height: 40,
    width: 40,
  },
});
