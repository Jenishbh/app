import React,{useState}from "react";
import {Alert, View,Image, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import {PrimaryButton} from "../../components/Button";
import Watch from '../Menu/Time';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {db} from '../../database/firebase'
//import { getAuth } from "firebase/auth";
function Reservation({navigation}){

        const [count, setCount] = useState(0);
        const [selectedCategoryIndex, setselectedCategoryIndex] = useState(0);
        //const auth = getAuth();
        //const user = auth.currentUser;
        
          const handlebook =() =>{

          //  db
          //  .collection(user.email)
          //  .doc('Reservastion')
          //  .set({
          //    'number of people' : count,
          //    Time: selectedCategoryIndex
          //  })
            Alert.alert('Book!!')
  
            navigation.navigate('Customer_main')
          }
        
        const ListCategories =()=>{
          
        
      return(

        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.catagoriesListContainer}
        >

          {Watch.map((category,index)=>(

            <TouchableOpacity 
            key={index} 
            activeOpacity={0.8}
            onPress={()=> setselectedCategoryIndex(index)} 
            >

              <View style={{
                backgroundColor:selectedCategoryIndex == index 
                ? 'orange' 
                : '#FEDAC5',
                ...style.categorryBtn
                }}>

                  

                  <Text 
                    style={{fontSize:15,
                       fontWeight: 'bold',
                        marginLeft: 10,
                         color: selectedCategoryIndex == index
                          ? 'white' 
                          : 'orange'
                           }}>
                    {category.tme}
                  </Text>

                </View>

            </TouchableOpacity>
          ))}

        </ScrollView>
      )
    }


    return(
        <ScrollView>
        <View 
        style={{flex:1,
            backgroundColor: 'white'}}
            >
                

                
                <View style={{height: 400, width:500,justifyContent: 'center', alignContent: 'center', }} >
                
                    <Image  source={require('../../assets/reservation.png') }
                    style={{height: 270, width:400, borderBottomLeftRadius:25, borderBottomRightRadius:25, right:4}} />

                <View style ={{borderRadius: 15,
                bordercolor: 'white', 
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,  
                height: 100, width: 320, 
                top : -20, backgroundColor: 'white', left: 35, flexDirection: 'row' , justifyContent: 'space-between'}}> 
                
                
                <Text style={{fontSize:20, color: 'lightblue',paddingLeft: 20, paddingVertical:10 }}>Family Table</Text>
                <Text style={{fontSize:17, color: 'orange', paddingRight:10, paddingVertical:15}}> Available</Text>
                
                </View>                   
                </View>

                <View style={{marginHorizontal: 10, justifyContent: 'space-between', paddingHorizontal: 1, paddingVertical: 10, }}>
                <Text style={{fontSize:16, fontWeight:'bold',}}> Details</Text>
                <Text style={{fontSize:14, color: 'gray', alignSelf:'flex-start', paddingTop: 10}}> Seize the Momemt. Meet Spark,a mini drone that features all of DJI's signature technologies, allowing you to size the moment whenever you feel inspired </Text>
                 
                 </View>

                 <View style={{marginHorizontal: 10, marginVertical:20, paddingVertical: -20, flexDirection: 'row', justifyContent:'space-between'}}  >

                    <Text style={{fontWeight: 'bold'}} > Number Of Persons</Text>
                    <View style={{alignSelf:'baseline'}}>
                    <Icon name='minus-circle-outline' size={18}  onPress={()=> {setCount(count-1)}}/>
                    </View>
                    <Text >{count}</Text>
                    <View > 
                    <Icon name='plus-circle-outline' size={18}  onPress={()=> {setCount(count+1)}}/>

                    </View>
                 </View>

                 <View style={{marginHorizontal: 10, marginVertical:20, paddingVertical: -20}}>

                 <Text style={{fontWeight: 'bold'}} > Pick a Time</Text>
                 <View style={{top:20}}>
                 <ListCategories />
                 </View >
                 </View>

                 <View style={{marginHorizontal: 20, marginVertical:20, paddingVertical: 20}}>

                 <Text style={{fontWeight: 'bold'}} > AddComments</Text>

                 <TextInput style={{height:100, width:350,borderRadius: 15,
                 backgroundColor: 'white',borderColor:'white',  shadowColor: 'gray', shadowOffset: {height: 4, width:-2}, shadowOpacity: 0.2, shadowRadius: 3
                 
                 }} placeholder='Write Comments' />

                 </View>




                

                

               

                <View style={{paddingBottom:70}}>
            

                <PrimaryButton
                btnContainer={{
                  height:50,
                  borderRadius:50,
                  width:200,
                  alignSelf: 'center',
                  
                }}
                onPress={handlebook}
                    title='Book Now'/>
                </View>


        </View>
        </ScrollView >
    )


    


}

const style = StyleSheet.create({
categorryBtn:{
    height: 45,
    width: 100,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    

   },

   categorryBtnImgCon:{
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignContent: 'center',
   },
  
})






export default Reservation;