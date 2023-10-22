import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TextInput, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PrimaryButton, SecondButton } from '../../components/Button';
import firebase from 'firebase/compat/app';



const Otp = ({ navigation }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [checkInterval, setCheckInterval] = useState(null);
    const [shouldCheck, setShouldCheck] = useState(true); 
    const [lastChecked, setLastChecked] = useState(null);

    const checkVerification = () => {
        const user = firebase.auth().currentUser;
        setLastChecked(new Date());
        if (user) {
            // Force reload the user data from Firebase
            user.reload().then(() => {
                console.log("User email verified status:", user.emailVerified);
                if (user.emailVerified) {
                    setIsVerified(true);
                    clearInterval(checkInterval);
                }
            }).catch(error => {
                console.error("Error reloading user data:", error);
            });
        } else {
            console.log("No user currently authenticated.");
        }
    };

    useEffect(() => {
        // Set up periodic checks every 10 seconds only if the email is not verified yet
        const checkInterval = setInterval(() => {
            if (!isVerified) { // <-- Only check for verification if not already verified
                checkVerification();
            }
        }, 10000);

        // Cleanup on unmount
        return () => {
            clearInterval(checkInterval);
        };
    }, [isVerified]); // We've added shouldCheck to the dependency array

   


    const resendVerificationEmail = () => {
        const user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
            Alert.alert("Email Sent", "A verification email has been sent. Please check your inbox.");
        }).catch(function(error) {
            Alert.alert("Error", "An error occurred while sending the verification email.");
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../../assets/third.jpg')} style={styles.logo} />
                <Text style={styles.title}>Authentication</Text>
                <Text>Last Checked: {lastChecked ? lastChecked.toLocaleTimeString() : "Not checked yet"}</Text>

                {isVerified == true ? (
                    <>
                       <Text style={styles.subtitle}>Welcome! Your email has been verified.</Text>
                        <Image
                        source={require('../../assets/animation_lnsac4fn_small.gif')}
                            style={{ height: 180, width:150, marginTop:50 }}                        
                        />
                      <PrimaryButton title='Continue' onPress={ ()=>navigation.navigate('OnBording')} 
                        btnContainer={{

                        backgroundColor: 'orange',
                        height: 55, width: 200,
                        borderRadius: 24,
                        marginTop: 24

                        }}/>
                        
                    </>
                ) : (
                    <>
                        <Text style={styles.subtitle}>An authentication link has been sent to your registered email. Please click on the link to verify.</Text>
                        
                    
                        
                        <PrimaryButton title='Resend Link' onPress={resendVerificationEmail} 
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
        marginTop: 100,
        alignItems: 'center',
    },
    footerText: {
        color: 'gray',
        fontSize: 16,
        lineHeight: 22,
    },
});

export default Otp;
