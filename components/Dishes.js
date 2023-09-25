import React, {useState} from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import {Card} from 'react-native-paper'
import { Font } from 'expo'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const numColumn = 2;

export default function Dishes({item}){
  return(
        <Card style={styles.card}>
             <Image 
              style = {styles.cardImage}
              source={item.image}
            />
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.price}>Price: ${item.price}</Text>
           
        </Card>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: 18,
    fontWeight:'bold',
    color: 'black',
    alignSelf:'center',
    padding:5
  },

  price:{
    fontSize: 14,
    color: 'black',
    alignSelf:'center',
    padding:3
  },

  card:{
    marginTop:10,
    width: (WIDTH*0.94) / numColumn,
    backgroundColor:'white',
    marginHorizontal:6,
    marginVertical: 6,
    borderRadius:5,
    alignSelf:'center',
    shadowColor:'black',
    shadowOpacity: 0.9, 
    shadowRadius:5,
    elevation:3, 
    shadowOffset:{width:1, height: 1}

  },
  cardImage:{
    width: '100%',
    height: HEIGHT/5,
    borderRadius:5,
  }
});