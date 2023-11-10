import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { db } from '../../database/firebase';

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    
    try {
        const qrData = JSON.parse(data);
        const email = qrData[0]; // Accessing the first element of the array
        const id = qrData[1]; // Accessing the second element of the array
        console.log(email, id);

        const rDoc = await db.collection('UserData').doc(email).collection('Reservation').doc(id).get();

        if (rDoc.exists) {
          console.log(rDoc.data())
          navigation.navigate('TableManagementScreen', rDoc.data());
        } else {
            alert('No Reservation Found');
        }
    } catch (error) {
        console.error("Error in QR code scanning or database operation: ", error);
        alert('Error processing QR code');
    }
};



  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.focusedContainer}>
            <View style={styles.focusedSquare}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
      </BarCodeScanner>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      <Text style={styles.instructionText}>Scan a QR code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  unfocusedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedContainer: {
    flex: 8,
  },
  focusedSquare: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
  },
});

export default QRScannerScreen;
