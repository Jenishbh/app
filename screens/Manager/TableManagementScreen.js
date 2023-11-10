import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'
const screenWidth = Dimensions.get('window').width;

const ReservationDetailsScreen = ({ navigation, route }) => {
    const  reservationId  = route.params;
    



    const handleKeepCurrentTable = () => {
        // Logic for keeping the current table
    };

    const handleSelectNewTable = () => {
        // Navigate to table selection screen
        navigation.navigate('TableSelectionScreen');
    };

    return (
        <ScrollView style={styles.scrollView}>
          <LinearGradient
            colors={['#e9ecef', '#adb5bd']} // Adjust these colors to your preference
            style={styles.gradientBackground}
          >
            <View style={styles.header}>
              <Icon name='arrow-back-ios' size={28} color="#FFF" onPress={navigation.goBack} />
            </View>
      
            <Image
              source={require('../../assets/third.png')}
              style={styles.logo}
              resizeMode="contain"
            />
      
            <Text style={styles.title}>Reservation Details</Text>
            
      
            <View style={styles.reservationDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Table</Text>
          <Text style={styles.detailValue}>{reservationId.Table_Type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Guests</Text>
          <Text style={styles.detailValue}>{reservationId.count}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{reservationId.Date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Time</Text>
          <Text style={styles.detailValue}>{reservationId.Time}</Text>
        </View>
      </View>

      
            <TouchableOpacity style={styles.confirmButton} onPress={handleKeepCurrentTable}>
              <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSelectNewTable}>
              <Text style={styles.confirmButtonText}>Change Reservation</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      );
      };
      
      const styles = StyleSheet.create({
        scrollView: {
          flex: 1,
        },
        gradientBackground: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 60, // Adjust this value as needed
        },
        header: {
          width: '100%',
          alignItems: 'flex-start',
          paddingHorizontal: 20,
          marginBottom: 20,
          marginTop:20
        },
        title: {
          color: '#FFF',
          fontSize: 38,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: -100,
        },

        reservationDetails: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white for a grayish effect
          borderRadius: 15,
          padding: 20,
          width: '80%', // Adjust width as needed
          marginTop: 80,
          marginBottom: 20,
          flexDirection: 'row',
          flexWrap: 'wrap', // Allows items to wrap to the next line
          justifyContent: 'space-between',
          paddingBottom:-20
        },
        detailItem: {
          // Half the width of the parent minus padding
          width: '48%', // Slightly less than half to account for justifyContent space-between
          marginBottom: 20, // Spacing between rows
          
          
        },
        detailLabel: {
          fontSize: 12,
          color: '#FFF',
          marginBottom: 15,
          textAlign:'center',
          
        },
        detailValue: {
          fontSize: 16,
          color: '#FFF',
          fontWeight: 'bold',
          textAlign:'center'
        },
        reservationInfo: {
          fontSize: 16,
          color: '#FFF',
          marginVertical: 5,
          alignSelf: 'flex-start',
        },
        qrCodeContainer: {
          borderWidth: 1,
          borderColor: '#FFF',
          padding: 10,
          borderRadius: 15,
          backgroundColor: 'white', // White background to contrast with QR code
          marginBottom: 30,
        },
        confirmButton: {
          backgroundColor: '#FF1493', // Deep pink
          borderRadius: 25,
          paddingVertical: 12,
          paddingHorizontal: 30,
          width: '80%', // Adjust width as needed
          alignItems: 'center',
          marginBottom: 50,
          marginVertical:30 // Added space at the bottom
        },
        confirmButtonText: {
          color: '#FFF',
          fontSize: 18,
        },
        logo: {
          width: 280, // Adjust as needed
          height: 280,
          top:-70  // Adjust as needed
           // Space from the top of the screen
        },
      });
export default ReservationDetailsScreen;
