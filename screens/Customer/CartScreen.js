import React,{useEffect} from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, RefreshControl,TextInput, Alert, SafeAreaView } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

//import {db} from '../../database/firebase'
//import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';





export default class CartScreen extends React.Component {
  
	constructor(props){
		super(props)

    const {navigation}= this.props

		this.state = {
      
			selectAll: false,
			cartItemsIsLoading: false,
			cartItems: []
	
		}
	}

	
	componentDidMount() {
        this.loadCartItems();
    }

    loadCartItems = async () => {
        try {
            const cartItemsString = await AsyncStorage.getItem('@cartItems');
            if (cartItemsString !== null) {
                const cartItems = JSON.parse(cartItemsString);
                this.setState({ cartItems });
            }
        } catch (e) {
            console.error("Error fetching cart items:", e);
        }
    };

    storeCartItems = async (cartItems) => {
        try {
            const cartItemsString = JSON.stringify(cartItems);
            await AsyncStorage.setItem('@cartItems', cartItemsString);
        } catch (e) {
            console.error("Error storing cart items:", e);
        }
    };

	addCartItem = async (item) => {
		const { cartItems } = this.state;
		const newItems = [...cartItems, item];
		this.setState({ cartItems: newItems });
		await this.storeCartItems(newItems);
	};
	
	updateCartItem = async (index, updatedItem) => {
		const { cartItems } = this.state;
		const newItems = [...cartItems];
		newItems[index] = updatedItem;
		this.setState({ cartItems: newItems });
		await this.storeCartItems(newItems);
	};
	
	removeCartItem = async (index) => {
		const { cartItems } = this.state;
		const newItems = [...cartItems];
		newItems.splice(index, 1);
		this.setState({ cartItems: newItems });
		await this.storeCartItems(newItems);
	};
	
	clearCart = async () => {
		await AsyncStorage.removeItem('@cartItems');
		this.setState({ cartItems: [] });
	};
	

	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});

		//const auth = getAuth();
    	//const user = auth.currentUser;
		//const dataref = db.collection('Reservation').doc(user.email);
		const { cartItems, cartItemsIsLoading, selectAll } = this.state;

		// Fetch DEtails from firebase

		//db.collection('Reservation').doc(user.email).collection('Food').get().then(DocumentSnapshot => {
		//	const a=[]
		//	if (!DocumentSnapshot.empty){DocumentSnapshot.forEach((DocumentSnapshot)=>{  
			  
		//	  a.push(DocumentSnapshot.data())
			  
		//	});this.setState({cartItems: a})
		//	}   
			
		//  })


		  //Submit fod to firebase

		 // const submitfood =()=>{
		//	const item = [...this.state.cartItems]

		//	db.collection('Reservation').doc(user.email).update({
		//	  total: item[index]['subtotalPrice']
		//	})
		//	navigation.navigate('Customer_home')
		 // }
		


		  //Check mark handler
			let selectHandler = (index, value) => {
				const newItems = [...this.state.cartItems]; // clone the array 
				newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
				this.setState({ cartItems: newItems }); // set new state
				//dataref.collection('Food').get().then(DocumentSnapshot => {
					
				//	DocumentSnapshot.forEach(doc =>{
				//		if (newItems[index]['id'] == doc.data().id) {
				//			doc.ref.update({checked: newItems[index]['checked']});
							
				//		}
				//	})})
			}
			



			let selectHandlerAll = (value) => {
				const newItems = [...this.state.cartItems]; // clone the array 
				newItems.map((item, index) => {
					newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
				});
				this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
				//dataref.collection('Food').get().then(DocumentSnapshot => {
					
					//DocumentSnapshot.forEach(doc =>{
						
					//		doc.ref.update({checked: !value});
							
						
					//})})
			}

			



			const deleteHandler = (index) => {
				const newItems = [...this.state.cartItems];
				newItems.splice(index, 1);
    			this.setState({ cartItems: newItems });
    			this.storeCartItems(newItems); 
				Alert.alert(
					'Are you sure you want to delete this item from your cart?',
					'',
					[
						{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
						{text: 'Delete', onPress: () => this.removeCartItem(index)
							 /* Update the state */
							//dataref.collection('Food').get().then(DocumentSnapshot => {
					
								//DocumentSnapshot.forEach(doc =>{
								//	if (newItems[index]['id'] == doc.data().id) {
								//		doc.ref.delete();
										
								//	}
								//})})
						},
					],
					{ cancelable: false }
				);
				
			}
			



			const quantityHandler = (action, index) => {
				const { cartItems } = this.state;
				const newItems = [...cartItems];// clone the array 
				
				let currentQty = newItems[index]['qty'];
				if(action == 'more'){
					newItems[index]['qty'] = currentQty + 1;
					
				
					//dataref.collection('Food').get().then(DocumentSnapshot => {
					
					//DocumentSnapshot.forEach(doc =>{
					//	if (newItems[index]['id'] == doc.data().id) {
					//		doc.ref.update({qty: newItems[index]['qty']});
							
					//	}
					//})})
			  //db.collection('Reservation').doc(user.email).collection('Food').where(id==index).update({qty: currentQty})
				} else if(action == 'less'){
					newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
					//dataref.collection('Food').get().then(DocumentSnapshot => {
					
						//DocumentSnapshot.forEach(doc =>{
							//if (newItems[index]['id'] == doc.data().id) {
							//	doc.ref.update({qty: newItems[index]['qty']});
								
							//}
					//	})})
					this.updateCartItem(index, newItems[index]);
				}
				
				this.setState({ cartItems: newItems }); // set new state
			}


			
			const subtotalPrice = () => {
				const { cartItems } = this.state;
				if(cartItems){
					return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.salePrice : 0), 0 );
				}
				return 0;
			}
		return (
      
			<View style={{flex: 1, backgroundColor: '#f6f6f6',marginTop:40}}>
				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-cart" size={25} color="#000" onPress={()=>this.props.navigation.navigate('Customer_main')}/>
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
						<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
					</View>
				</View>
				
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						{cartItems && cartItems.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 100}}>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(i, item.checked)}>
										<Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity>
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									{/*<TouchableOpacity  style={{paddingRight: 10}}>
										<Image source={{uri: item.thumbnailImage}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
            </TouchableOpacity>*/}
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
										
                    <Text numberOfLines={1} style={{color: '#333333', marginVertical: 5}}>${(item.qty * item.salePrice).toFixed(2)}</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
											<TouchableOpacity onPress={() => quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(i)}>
										<Ionicons name="md-trash" size={25} color="#ee4d2d" />
									</TouchableOpacity>
									
								</View>
							</View>
							
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5, paddingBottom:30}}>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
								</View>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Voucher</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Enter voucher code" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity>
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Select All</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>${subtotalPrice().toFixed(2)}</Text>
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
						<TouchableOpacity style={[styles.centerElement, { backgroundColor: '#ff0000', width: 100, height: 33, borderRadius: 5, marginRight: 10 }]} onPress={this.clearCart}>
        					<Text style={{ color: '#ffffff' }}>Clear Cart</Text>
    					</TouchableOpacity>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 33, borderRadius: 5}]} onPress={()=>this.props.navigation.navigate('ReservationHome')}>
								<Text style={{color: '#ffffff'}}>Checkout</Text>
							</TouchableOpacity>
							
						</View>
					</View>
				}
			</View>
      
		);
	}
}