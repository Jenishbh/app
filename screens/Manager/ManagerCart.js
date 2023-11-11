import { Text, View, SafeAreaView, StyleSheet,  Image, ScrollView,Alert , Animated} from 'react-native'
import React, {useState,useEffect} from 'react'
import {SecondButton} from '../../components/Button'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { icons } from '../Menu/food'
//import {db} from '../../database/firebase'
//import { getAuth } from "firebase/auth";

import AsyncStorage from '@react-native-async-storage/async-storage';



const ManagerCart = ({navigation, route})=>{
    const [count, setCount] = useState(0);
    const item = route.params;
    //const auth = getAuth();
    //const user = auth.currentUser;
    
    
    
    const addToCart = async (itemToAdd) => {
        try {
            const storedCart = await AsyncStorage.getItem('@FoodStorage');
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
            await AsyncStorage.setItem('@FoodStorage', JSON.stringify(cartItems));
    
        } catch (error) {
            console.error("Error adding item to cart", error);
        }
    };
    
    const handlebook = async () => {

        await addToCart(item);
        navigation.navigate('FoodSelectionScreen');

    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Icon name='arrow-back-ios' size={28} onPress={navigation.goBack} />
                <Text style={styles.headerText} onPress={navigation.goBack}>Details</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                
                <View style={styles.details}>
                    {/* Name and Favorite Icon */}
                    <View style={styles.nameFavoriteContainer}>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <View style={styles.iconContainer}>
                            <Icon name='favorite-border' color={'orange'} size={25} />
                        </View>
                    </View>

                    {/* Person and Time Icons */}
                    <View style={styles.personTimeContainer}>
                        <Icon name="person" size={25} color="gray" />
                        <Text style={styles.iconText}>{item.person}</Text>
                        <Icon name="more-time" size={25} color="gray" style={styles.timeIcon} />
                        <Text style={styles.iconText}>{item.duration}</Text>
                    </View>

                    {/* Details and Price */}
                    <Text style={styles.detailsText}>{item.details}</Text>
                    <Text style={styles.priceText}>$ {item.price}</Text>

                    {/* Ingredients */}
                    {/* Ingredients */}
                    <View style={styles.ingredientsContainer}>
                        <Text style={styles.ingredientsTitle}>Ingredients</Text>
                        <View style={styles.ingredientRow}>
                            {item.ingredients && item.ingredients.split(',').map((ingredient, index) => {
                                
                                const icon = icons.find(i => i.name.toLowerCase() === ingredient.trim().toLowerCase());

                                return (
                                    <View key={index} style={styles.ingredientItem}>
                                        {icon && <Image source={icon.image} style={styles.ingredientIcon} />} 
                                        <Text style={styles.ingredientText}>{ingredient.trim()}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>


                    {/* Add to Cart Button */}
                    <View style={styles.buttonContainer}>
                        <SecondButton title='Add to Cart' btnContainer={styles.addButton} onPress={handlebook} />
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    scrollView: {
        flex: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    image: {
        height: 180,
        width: 180,
        borderRadius: 30
    },
    details: {
        margin: 5
    },
    nameFavoriteContainer: {
        alignItems: 'center'
    },
    foodName: {
        fontSize: 20,
        fontWeight: '500',
        color: 'lightblue'
    },
    iconContainer: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    personTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconText: {
        marginLeft: 5,
        color: 'gray'
    },
    timeIcon: {
        marginLeft: 20
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: 'gray',
        marginHorizontal:8
    },
    priceText: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 10
    },
    ingredientsContainer: {
        backgroundColor: 'white',
        marginHorizontal: 8
    },
    ingredientsTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        justifyContent: 'space-between',
        margin: 5
    },
    ingredientText: {
        marginLeft: 5,
        color: 'gray'
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40
    },
    addButton: {
        height: 50,
        width: 250,
        alignSelf: 'center',
        backgroundColor: 'lightblue'
    },
    ingredientIcon: {
        width: 20,   // Width of the icon
        height: 20,  // Height of the icon
        marginRight: 5, // Space between the icon and the text
    },
});

export default ManagerCart;