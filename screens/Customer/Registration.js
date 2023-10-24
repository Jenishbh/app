import React, { useState } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet ,Image} from 'react-native';
import jsonData from '../data/data.json'; // Update the path to your JSON file
import Icon from 'react-native-vector-icons/FontAwesome';


const Registration = () => {
  const [data, setData] = useState(jsonData);
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const formattedTime1 = currentDate.toLocaleTimeString();

  return (
    <View style={styles.container}>
      <Text style={styles.text_heading}>MY Reservations</Text>
      <Text style={styles.text_h2}>Review your current and past reservations</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style= {styles.container_1}>
          <View >
            <Image
            source={require('../assets/favicon.png')}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.iconContainer}>
              <Icon name="heart" size={12} color="red" />
              <Text style={styles.count}>{item.heartCount}</Text>
              <Text style={styles.dateText}>{item.formattedDate}</Text>
              <Text style={styles.timeText}>{item.formattedTime1}</Text>
            </View>
            <View>
              <Text style={styles.dateText}>Jensish {formattedDate}</Text>
              <Text style={styles.text}>{item.greeting}</Text>
            </View>
          </View>
          </View>
          </View>
        )}
      />
      </View>
      
  );
};

const styles = StyleSheet.create({
    container_1:{
     backgroundColor:"white",
     borderWidth: 2,        
        
     borderRadius: 20,
     marginLeft:35,
     marginRight:35,
     marginBottom:7,
    },
    text_heading:{
     fontSize:35,
     marginLeft:40,
    },
    text_h2:{
      fontSize:25,
      marginLeft:40,
    },
    image: {
      width: 100,
      height: 100, // Adjust the dimensions as needed
      justifyContent: "flex-end",
      alignItems: 'center',
      margin:10
    },
    infoContainer: {
      
      position: 'absolute',
      left: 125,
      paddingTop: 20,
      
      
    },
    text: {
      fontSize: 16,
        
    },
    
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    count: {
      marginLeft: 5,
      fontSize: 16,
    },
    
    dateText: {
      marginLeft: 5,
      fontSize: 16,
    },
    timeText:{
      marginLeft: 5,
      fontSize: 16,
    },
  });
  

export default Registration;



