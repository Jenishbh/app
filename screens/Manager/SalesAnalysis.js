import { useState, useEffect } from "react";

import { db } from "../../database/firebase";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet } from "react-native";

export default function SalesAnalysis({ navigation }) {
  const [foodhistory, setFoodHistory] = useState("");
  const [foodDetails, setFoodDetails] = useState("");
  const [itemNames, setItemNames] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemtotalPrice, setItemtotalPrice] = useState("");

  const fetchcategory = async () => {
    try {
      const categoryitem = db.collection("FoodHistory");
      const snapshot = await categoryitem.get();
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoodHistory(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchcategory();
    //console.log(foodhistory);
    setFoodDetails(foodhistory.map((item) => item.foodDetails));
    setItemNames(foodDetails[0].map((item) => item.name));
    setItemQuantity(foodDetails[0].map((item) => item.qty));
    setItemtotalPrice(foodDetails[0].map((item) => item.totalPrice));
  }, []);

  console.log(foodDetails);
  console.log(itemQuantity);
  console.log(itemtotalPrice);
  console.log(itemNames);

  console.log(itemNames);
  const qtydata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const totalpricedata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfigqty = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",

    color: (opacity = 0) => `rgba(255, 165, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };
  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",

    color: (opacity = 0) => `rgba(255, 165, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView style={styles.scroll}>
      <View>
        <Text> Hello There</Text>
        <TouchableOpacity>
          <Text>Proceed to Table Selection</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Quantity Sold
        </Text>
        <BarChart
          style={styles.graphStyle}
          data={qtydata}
          width={Dimensions.get("window").width}
          height={500}
          yAxisLabel="Q"
          yAxisInterval={1}
          chartConfig={chartConfigqty}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
        />

        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Total Price
        </Text>
        <BarChart
          style={styles.graphStyle}
          data={totalpricedata}
          width={Dimensions.get("window").width}
          height={500}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
          yAxisInterval={1}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
