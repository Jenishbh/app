import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Image, ImageBackground, Text, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail, } from 'firebase/auth'



function Forget_pass() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')

  const [feedback, setFeedback] = useState('');

  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };


  const forgot_pass_handle = () => {    //handle Forget Pass by Firebase

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your email...')
      })
      .catch((error) => alert(error.message));
    if (!isValidEmail(email)) {
      setFeedback('Please enter a valid email address.');
      return;
    }
    setFeedback('Please check your email...');

  }



  return (
    <SafeAreaView style={styles.background}>
      <Image style={styles.logo} source={require('../../assets/third.png')} />
      <Text style={styles.forget_icon}> Forgot Password? </Text>
      <Text style={styles.remind}> Enter your email below to reset your password </Text>

      <TextInput
        placeholder='Email'
        value={email}
        style={styles.email}
        onChangeText={text => setEmail(text)}
      />



      <TouchableOpacity style={styles.submit_button} onPress={console.log('Forgot Press')} />

      <TouchableOpacity style={styles.submit_button}>
        <Button title='Submit' color='orange' onPress={forgot_pass_handle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.help}>
        <Button title='Need Help?' color='orange' onPress={console.log('Help Pressed')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.go_home}>
        <Button title=' Log-in' color='orange' onPress={() => navigation.navigate('Signin')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    height: 120,
    width: 340,
    top: -120
  },

  forget_icon: {

    color: 'gray',
    top: -60,
    fontSize: 24,
    alignContent: 'center',
    alignItems: 'center'
  },

  remind: {
    fontSize: 15,
    alignContent: 'center',
    color: 'gray',
    top: -35
  },

  email: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
    margin: 1,
    width: 300,
    height: 60,
    top: -30,
    color: 'black',
    alignItems: 'center'
  },

  submit_button: {
    borderBottomWidth: 0,
    borderColor: 'orange',
    top: 30,
    borderRadius: 12,
    padding: 8,
    width: 200,
    alignContent: 'center'
  },

  help: {
    color: 'orange',
    top: 50,
    lineHeight: 18,
    height: 39,
    borderRadius: 10
  },


  go_home: {

    backgroundColor: '#191E25',
    lineHeight: 23,
    fontSize: 15,
    top: 170,
    alignItems: 'center',
    borderRadius: 10,
  }
});

export default Forget_pass;