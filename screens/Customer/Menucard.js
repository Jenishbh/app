import React, { useEffect,useState } from 'react'
import { Text, View, SafeAreaView,StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
//import { getAuth } from "firebase/auth";
import {foods,menu, categories} from '../Menu/food';
//import {db} from '../../database/firebase'

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

function Menucard({navigation}) {
  //const auth = getAuth();
  //const user = auth.currentUser;
  const [selectedCategoryIndex, setselectedCategoryIndex] = React.useState(0);
  const [selectedMenutype, setSelectedMenuType] = React.useState(0);
  const [Search, setSearch] = React.useState(true)
  const [Filter, setFilter] = React.useState(foods)
  const [imgUrl, setImgUrl] = useState()
  const [firstname, setFirstname] = useState('')
  //React.useEffect(()=>{
   // handleChangeCategory(selectedCategoryIndex, selectedMenutype)
  //}, [])

//useEffect(()=>{
//  db
//  .collection('UserData').doc(user.email).get().then(DocumentSnapshot => {
//    if (DocumentSnapshot.exists){
 //     const udata = DocumentSnapshot.data()
      
      
 //     setFirstname(udata.firstName)
      
  //    setImgUrl(udata.imageUrl)
 //   }
 // })
//},[])
  // helper function for search
  const onSearch = (text) =>{
    const tempList = foods.filter(item=>{
      const itemData = item.name ? item.name.toUpperCase(): ''.toUpperCase()
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    } )
    setFilter(tempList)
    
  }


  // Helper function for catagories


  
  const ListCategories =()=>{

      

      return(

        <ScrollView
      
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.catagoriesListContainer}
        
        >

          {categories.map((category,index)=>(

            <TouchableOpacity 
            key={index}
            activeOpacity={0.8}
            onPress={()=> {setselectedCategoryIndex(index)} }
            >

              <View style={{
                backgroundColor:selectedCategoryIndex == index 
                ? 'orange' 
                : '#FEDAC5',
                ...style.categorryBtn
                }}>

                  <View 
                  style={style.categorryBtnImgCon}
                  >
                    <Image 
                    source={category.image} 
                    style={{height:35, width:35, resizeMode: 'cover'
                    }} />

                  </View>

                  <Text 
                    style={{fontSize:15,
                       fontWeight: 'bold',
                        marginLeft: 10,
                         color: selectedCategoryIndex == index
                          ? 'white' 
                          : 'orange'
                           }}>
                    {category.name}
                  </Text>

                </View>

            </TouchableOpacity>
          ))}

        </ScrollView>
      )
    }

    const Card = ({food}) => {
      return(
        <TouchableHighlight 
        underlayColor={'white'} 
        activeOpacity={0.9} 
        onPress={()=> navigation.navigate('DetailsScreen', food)}
        >

        <View style ={style.card}>
          <View style={{alignItems: 'center', top :-40}}>
            <Image source={food.image} style ={{height: 120, width: 120}} />
          </View>



          <View style ={{marginHorizontal : 10}}>
            <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center',}}> {food.name}</Text>
            <Text style={{fontSize:14, color: 'gray', marginTop: 2, textAlign: 'center'}}> {food.ingredients}</Text>
          </View>



          <View style={{marginTop:10,
             marginHorizontal:20,
             flexDirection: 'row',
             justifyContent: 'space-between',
              }}> 


              <Text style={{fontSize: 18, fontWeight: 'bold'}}> ${food.price}</Text>
              <View style={style.addtobtn} >
                <Icon name='add' size={20} color='white' />
              </View>

          </View>

        </View>

      </TouchableHighlight>

      );
    }


    //function handleChangeCategory(categoryId, menuTypeId){

      //find the menu based on the menuTypeId
      //let selectedMenu = menu.find(a => a.id == menuTypeId)


      //set the menu based on categoryId
      //setMenuList(selectedMenu?.list.filter(a=> a.categories.includs(categoryId)))

    //}


    
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
        paddingBottom: 20
      }}>


        <View style={style.inputcontainer}>

          <Icon name='search' size={28} />

          <TextInput 
          style={{flex:1, fontSize:18, color:'gray'}}
          placeholder='Search food...'
          onChangeText={(text)=>onSearch(text)}
          />

        </View>

        <View style={style.sortBtn}>

          <Icon name='tune' size={28} color='#FEDAC5' />

        </View>

      </View>

      <View>

    

      </View>
      { Search &&
      <FlatList 
      showsVerticalScrollIndicator ={false}
      numColumns={2}
      data={Filter}
      renderItem={({item}) => <Card food={item} />}
      />
      }

      

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
    backgroundColor: 'white',
    shadowColor: '#ededed',
    shadowRadius: 10,
    shadowOpacity: 3,
    borderWidth:1,
    borderColor: '#f5f5f5',
    alignContent: 'flex-end'
    
    
    

   },
   addtobtn:{
    height: 30,
    width: 30,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',

   }
  });


export default Menucard;



