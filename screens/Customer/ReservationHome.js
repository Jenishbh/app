import { Text, View, SafeAreaView, StyleSheet,Dimensions,Image,FlatList,TouchableHighlight } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Table from '../Menu/Table';
import {db,auth} from '../../database/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const {width} = Dimensions.get('screen');
const cardWidth = width - 20;




function ReservationHome({navigation}) {
  //const auth = getAuth();
  //const user = auth.currentUser;
  const [imgUrl, setImgUrl] = useState()
  const [firstname, setFirstname] = useState('')
  //useEffect(()=>{
  //  db
  //  .collection('UserData').doc(user.email).get().then(DocumentSnapshot => {
  //    if (DocumentSnapshot.exists){
  //      const udata = DocumentSnapshot.data()
  //      
  //      
  //      setFirstname(udata.firstName)
  //      
  //      setImgUrl(udata.imageUrl)
  //    }
  //  })
  //},[])


  // ... rest of your component

    const Card = ({Table}) => {
        return(
          <TouchableHighlight 
          underlayColor={'white'} 
          activeOpacity={0.9} 
          onPress={()=> navigation.navigate('ReservationDetails', Table)}
          >
  
          <View style ={style.card}>
            <View style={{alignItems: 'center', top :-10}}>
              <Image source={Table.image} style ={{height: 120, width: cardWidth-10, borderRadius:20}} />
            </View>
  
  
  
            <View style ={{marginHorizontal : 10, marginTop:10}}>
              <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center',}}> {Table.name}</Text>
              <Text style={{fontSize:14, color: 'gray', marginTop: 2, textAlign: 'center'}}> Size: {Table.size}</Text>
            </View>
  
  
  
            <View style={{marginTop:10,
               marginHorizontal:20,
               flexDirection: 'row',
               justifyContent: 'space-between',
                }}> 
  
  
                <Text style={{fontSize: 18, fontWeight: 'bold'}}> ${Table.price}</Text>
                <View style={style.addtobtn}>
                  <Icon name='add' size={20} color='#add8e6'/>
                </View>
  
            </View>
  
          </View>
  
        </TouchableHighlight>
  
        );
      }
    return (
        <SafeAreaView style={{flex:1,backgroundColor: 'white'}}>

        <View style={style.header}>
          <View>
            <View>
              <Text style={{flexDirection: 'row'}} >
                <Text style={{fontSize: 28}}>Hello, </Text>
                <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
                  {firstname} 
                  </Text>
  
              </Text>
            </View>
  
            <Text 
            style={{marginTop: 5, 
            fontSize: 22, 
            color: '#FEDAC5'
            }}>
              Help yourself for select order
            </Text>
  
  
          </View>
  
          <Image 
          source={{uri: imgUrl}} 
          style={{height:50, width: 50, borderRadius: 25}}
  
          />
        </View>
   
        <View style={{
          marginTop:40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>

        </View>
      
      <FlatList 
      showsVerticalScrollIndicator ={false}
      numColumns={1}
      data={Table}
      renderItem={({item}) => <Card Table={item} />}
      />
      

      

    </SafeAreaView>
  
    )
  
}

const style=StyleSheet.create({
    header:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
      paddingHorizontal:20,
   },
   inputcontainer:{
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingHorizontal: 20,

   },

   sortBtn:{
    width:50,
    height: 50,
    marginLeft: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
   },
   catagoriesListContainer:{
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20
,
   },
   categorryBtn:{
    height: 45,
    width: 120,
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

   card:{
    height:220,
    width:cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: '#e7feff',
    shadowColor: '#ededed',
    shadowRadius: 10,
    shadowOpacity: 10,
    borderWidth:1,
    borderColor: '#f5f5f5',
    alignContent: 'flex-end'
    
    
    

   },
   addtobtn:{
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

   }
  });


export default ReservationHome ;