import { Text, View, SafeAreaView, StyleSheet,  Image, ScrollView,Alert , Animated} from 'react-native'
import React, {useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {SecondButton} from '../../components/Button'
//import {db} from '../../database/firebase'
//import { getAuth } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';



const DetailsScreen = ({navigation, route})=>{
    const [count, setCount] = useState(0);
    const item = route.params;
    //const auth = getAuth();
    //const user = auth.currentUser;

    
    
    const addToCart = async (itemToAdd) => {
        try {
            const storedCart = await AsyncStorage.getItem('@cartItems');
            let cartItems = [];
    
            if (storedCart !== null) {
                cartItems = JSON.parse(storedCart);
            }
    
            // Check if the item already exists in the cart
            const existingIndex = cartItems.findIndex(item => item.id === itemToAdd.id);
    
            if (existingIndex > -1) {
                // Update the quantity of the existing item
                cartItems[existingIndex].qty += 1;
            } else {
                // Add the new item to the cart
                const newItem = {
                    id: itemToAdd.id,
                    name: itemToAdd.name,
                    qty: 1,
                    salePrice: itemToAdd.price,
                    image: itemToAdd.image,
                    checked: 1
                };
                cartItems.push(newItem);
            }
    
            // Store the updated cart back to AsyncStorage
            await AsyncStorage.setItem('@cartItems', JSON.stringify(cartItems));
    
        } catch (error) {
            console.error("Error adding item to cart", error);
        }
    };
    
    const handlebook = async () => {

       // const dataref = db.collection('Reservation').doc(user.email);
        
       // dataref.collection('Food').get().then(DocumentSnapshot => {
       //     let updated = false;
        //    DocumentSnapshot.forEach(doc =>{
        //        if (item.id == doc.data().id) {
        //            doc.ref.update({qty: doc.data().qty + 1});
        //            updated = true;
        //        }
        //    })
        //    if (!updated){
        //        console.log("not update")
        //        dataref.collection('Food')
        //        .add({
        //            id: item.id,
        //            name: item.name,
        //            qty: 1,
        //            salePrice: item.price,
        //            image: item.image,
        //            checked: 1
        //        })
        //    }
        //})
        await addToCart(item);
        navigation.navigate('Home');

    }

    return(
    <SafeAreaView style={{backgroundColor: 'white'}}>

        <View style={style.header} >

            <Icon name ='arrow-back-ios' size={28} onPress={navigation.goBack}/>
            <Text style={{fontSize: 20, fontWeight: 'bold' }} onPress={navigation.goBack}>Details</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator ={false}>
            <View 
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 280,

            }}>
                <Image source={item.image} style={{height: 220, width: 220,borderRadius:30 }}/>
            </View>
            <View style={style.details}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white' }}>{item.name}</Text>
                    <View style={style.iconContaioner}> 
                    <Icon name='favorite-border' color={'orange'} size={25} />
                    </View>
                    </View>
                    <Text style={style.detailsText}>
                        {item.details}
                    </Text>

                    <View style={{marginTop: 80, marginBottom: 40 }}>
                        <SecondButton title='Add to Cart'
                        btnContainer={{
                            height:50,
                            width:250,
                            alignSelf:'center',
                            
                        }} onPress={handlebook}/>
                    </View>
                </View>
           
        </ScrollView>

    </SafeAreaView>
)}


const style = StyleSheet.create({ 
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal : 20
    },
    details: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 40,
        backgroundColor: 'orange',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,

    },

    iconContaioner: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

    },
    detailsText:{
        marginTop:10,
        lineHeight: 22,
        fontSize:16,
        color: 'white',
        
    }
})

export default DetailsScreen;