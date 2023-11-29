import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity, Modal, Alert, Linking   } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Icona from 'react-native-vector-icons/Ionicons';
import Ico from 'react-native-vector-icons/MaterialCommunityIcons';

function RegistrationDetails({ route }) {
  const { reservation } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');
  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItemContainer}>
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>{`$${item.salePrice}`}</Text>
      <Text style={styles.foodQuantity}>{`Qty: ${item.qty}`}</Text>
    </View>
  );
  const openReceiptModal = (url) => {
    setReceiptUrl(url); // Set the receipt URL from the reservation data
    setModalVisible(true);
  };

  // Function to close the receipt modal
  const closeReceiptModal = () => {
    setModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/table/gen_tab.jpg')} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{reservation.Table_Type}</Text>
        <View style={styles.infoRow}>
          <Icon name="date" size={20} color="#333" />
          <Text style={styles.infoText}>{reservation.Date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icona name="people-outline" size={20} color="#333" />
          <Text style={styles.infoText}>{`${reservation.Number_of_People} People`}</Text>
        </View>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>Details about the table, ambiance, and other miscellaneous information can go here.</Text>
        <Text style={styles.sectionTitle}>Ordered Food</Text>
        <FlatList
          data={reservation.foodDetails}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.foodList}
        />
      {/* Button to view the receipt */}
      <TouchableOpacity onPress={()=>openReceiptModal(reservation.receiptImageUrl)} style={styles.receiptButton}>
        <Text style={styles.receiptButtonText}>View Receipt</Text>
      </TouchableOpacity>

      {/* Modal for displaying the receipt */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeReceiptModal}
      >
        <View style={styles.modalView}>
          <Image
            source={{uri: receiptUrl}} // Replace with dynamic receipt image source
            style={styles.receiptImage}
          />
          <TouchableOpacity onPress={closeReceiptModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  foodItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  foodName: {
    fontSize: 16,
  },
  foodPrice: {
    fontSize: 16,
    color: '#333',
  },
  foodQuantity: {
    fontSize: 16,
    color: '#666',
  },
  foodList: {
    marginVertical: 15,
  },
  receiptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  receiptButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  receiptImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegistrationDetails;
