import React from "react";

import { Text, View, SafeAreaView, StyleSheet,  Image, ScrollView,Alert , Animated} from 'react-native'
import {PrimaryButton} from '../../components/Button'

import { useNavigation } from '@react-navigation/native';


const Error = () =>{
    
return(
    <SafeAreaView     
    style={{
        flex: 1,
        paddingVertical: 12,
        backgroundColor: 'white'
      }} >
        <View >
            <Image source={require('../../assets/Error.png')} style={{width: '62%', height: '50%', alignSelf:'center', top:190}}/>
            <Text style={{alignSelf:'center', top:190}}>Uhh! Something Went Wrong</Text>
            <View style={{alignSelf:'center', top:230}}>
            
            <PrimaryButton
            btnContainer={{

                backgroundColor:  'orange' ,
                height: 55, width: 200,
                borderRadius: 24,
                marginTop: 24

            }}
            //onPress={() => navigation.navigate('Login')}
            title='Login' />
            
            </View>
        </View>
    </SafeAreaView>
)
}


export default Error;