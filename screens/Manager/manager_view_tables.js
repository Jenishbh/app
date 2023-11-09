import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import table_info from "./table_info.js";
import { NavigationContainer } from "@react-navigation/native";

const Table_view = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.background}>
        <TouchableOpacity
          style={styles.tables}
          onPress={() => {
            navigation.navigate("table_info");
          }}
        >
          <Image
            source={require("../assets/tables/indoor_long.jpg")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Indoor Long table</Text>
            <Text style={styles.table_occupy}> occupy by : 8</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tables}
          onPress={() => {
            navigation.navigate("table_info");
          }}
        >
          <Image
            source={require("../assets/tables/outdoor_small.jpg")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> outdoor small Table</Text>
            <Text style={styles.table_occupy}> occupy by : 5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tables}>
          <Image
            source={require("../assets/qr-code-scan-icon.png")}
            style={styles.table_image}
          />
          <View style={styles.info}>
            <Text style={styles.table_type}> Table 1</Text>
            <Text style={styles.table_occupy}> occupy by</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFFEFA",
  },
  tables: {
    height: 120,
    flexDirection: "row",
    marginHorizontal: 11,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: "#e7feff",
    shadowColor: "#ededed",
    shadowRadius: 10,
    shadowOpacity: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    alignContent: "flex-end",
  },
  table_type: {
    color: "black",
    marginBottom: 0,
    marginRight: 150,
    marginTop: 20,
    marginBottom: 30,
  },
  table_image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  table_occupy: {
    color: "black",
    marginBottom: 10,
    marginRight: 200,
  },
  info: {
    flexDirection: "column",
    justifyContent: "flex-start ",
  },
});

export default Table_view;
