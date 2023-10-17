import React, { useState, useRef } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TextInput, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { PrimaryButton, SecondButton } from '../../components/Button';
import { auth } from '../../database/firebase';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/compat';


const Otp = ({ navigation }) => {
    const [timer, setTimer] = useState(60);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [countryCode, setCountryCode] = useState('+1'); // default to US
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const sendVerificationCode = async () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            setTimer(60);
        } catch (error) {
            console.error('Phone number verification failed. Check your phone number.', error);
        }
    };

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
            await firebase.auth().signInWithCredential(credential);
            navigation.replace('Onbording');
        } catch (error) {
            console.log('Invalid code.');
        }
    };
    const onCaptchaVerify = () => {
        setCaptchaVerified(true);
    };
    // Timer logic
    React.useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../../assets/third.jpg')} style={styles.logo} />
                <Text style={styles.title}>OTP Authentication</Text>
                <Text style={styles.subtitle}>An authentication code had been sent to Registered email</Text>

                {!verificationId ? (
                    <>
                        <View style={styles.phoneContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setCountryCode(value)}
                            items={[
                                { label: 'US (+1)', value: '+1' },
                                { label: 'UK (+44)', value: '+44' },
                                // ... other countries
                            ]}
                            style={{...pickerSelectStyles, flex:1, maxWidth: '40%'}}
                            value={countryCode}
                            placeholder={{ label: "Select a country...", value: null }}
                            useNativeAndroidPickerStyle={false}

                        />
                        <TextInput
                            placeholder='Enter Phone Number without country code'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            style={{...styles.input, flex:1, maxWidth: '60%'}}
                        />
                        </View>
                       
                        
                            <PrimaryButton title='Send OTP' onPress={sendVerificationCode}
                                btnContainer={{
                                    backgroundColor: 'orange',
                                    height: 55, width: 200,
                                    borderRadius: 24,
                                    marginTop: 24
                                }} />
                        
                    </>
                ) : (
                    <>
                        <OTPInputView
                            pinCount={4}
                            style={styles.otpInput}
                            codeInputFieldStyle={styles.otpField}
                            onCodeFilled={setCode}
                        />
                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't receive code?</Text>
                            <SecondButton
                                title={`Resend (${timer}s)`}
                                disabled={timer !== 0}
                                onPress={sendVerificationCode}
                            />
                        </View>
                        <PrimaryButton title='Continue' onPress={confirmCode} 
                        btnContainer={{

                        backgroundColor: 'orange',
                        height: 55, width: 200,
                        borderRadius: 24,
                        marginTop: 24

                        }}/>
                    </>
                )}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>By creating an account, you agree to our,</Text>
                    <SecondButton title='Terms and Condition' onPress={() => console.log('TNC')} />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: '80%',
        height: 55,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 25,
        fontSize: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    inputAndroid: {
        width: '85%',
        height: 55,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        elevation: 4,
    },
    placeholder: {
        color: 'gray',
        
    },
    iconContainer: {
        top: 20,
        right: 15,
        
    },
});

const styles = StyleSheet.create({
    pickerSelectStyles:{
        width: '80%',
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 10,
        fontSize: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        placeholder: {
            color: 'gray',
            
        },
        iconContainer: {
            top: 20,
            right: 15,
            
        },

    },
    phoneContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 2,
        alignItems: 'center', // to align items vertically in the center
    },
    container: {
        flex: 1,
        paddingVertical: 24,
        backgroundColor: 'white',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 300,
    },
    title: {
        fontSize: 22,
        lineHeight: 30,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
        color: 'gray',
        marginTop: 48,
        textAlign: 'center',
    },
    input: {
        width: '85%',
        height: 55,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 25,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    otpInput: {
        width: '100%',
        height: 50,
    },
    otpField: {
        width: 65,
        height: 65,
        borderRadius: 12,
        backgroundColor: 'lightgray',
        color: 'black',
        fontSize: 16,
        lineHeight: 22,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    resendText: {
        color: 'gray',
        fontSize: 16,
        lineHeight: 22,
    },
    footer: {
        marginTop: 184,
        alignItems: 'center',
    },
    footerText: {
        color: 'gray',
        fontSize: 16,
        lineHeight: 22,
    },
});

export default Otp;
