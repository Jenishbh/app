import React, { useState, useCallback,useEffect } from 'react';
import { 
    Text, View, SafeAreaView, StyleSheet, Image, TextInput,
    ScrollView, TouchableOpacity, FlatList, Dimensions,
    TouchableHighlight 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { foods, categories } from '../Menu/food';

const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

function Menucard({ navigation }) {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [filteredList, setFilteredList] = useState(foods);
    const [imgUrl, setImgUrl] = useState();
    const [username, setUsername] = useState('');
    
    useEffect(() => {
      const currentCategory = categories[selectedCategoryIndex];
      if (currentCategory) {
          const filtered = foods.filter(food => food.categoryid === currentCategory.id);
          setFilteredList(filtered);
      } else {
          setFilteredList(foods);  // If no category is selected, show all foods
      }

      const fetchUserData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('user_data');
            if (storedData) {
                const udata = JSON.parse(storedData);
                setUsername(udata.username || '');
                setImgUrl(udata.imgUrl || '');
            }
        } catch (error) {
            console.error("Error fetching user data from AsyncStorage:", error);
            Alert.alert('Error fetching user data. Please try again.');
        }
    };

    fetchUserData();
    }, [selectedCategoryIndex]);
  
    const onSearch = useCallback((text) => {
        const tempList = foods.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.includes(textData);
        });
        setFilteredList(tempList);
    }, []);

    const renderCategoryList = () => (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catagoriesListContainer}>
            {categories.map((category, index) => (
                <TouchableOpacity 
                    key={index}
                    activeOpacity={0.8}
                    onPress={() =>   {  
                      if (selectedCategoryIndex === index) {
                      setSelectedCategoryIndex(null);  // Deselect category
                      } else {
                      setSelectedCategoryIndex(index);  // Select category
                      }
                      }}>
                    <View style={[ 
                        styles.categorryBtn,
                        { 
                            backgroundColor: selectedCategoryIndex === index 
                                ? 'orange' 
                                : '#FEDAC5' 
                        }
                    ]}>
                        <View style={styles.categorryBtnImgCon}>
                            <Image 
                                source={category.image} 
                                style={{ height:35, width:35, resizeMode: 'cover' }} 
                            />
                        </View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginLeft: 10,
                            color: selectedCategoryIndex === index ? 'white' : 'orange'
                        }}>
                            {category.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderCard = ({ item: food }) => (
        <TouchableHighlight 
            underlayColor={'white'} 
            activeOpacity={0.9} 
            onPress={() => navigation.navigate('DetailsScreen', food)}>
            <View style={styles.card}>
                <View style={{ alignItems: 'center', top:-30 }}>
                    <Image source={food.image} style={{ height: 120, width: 120, borderRadius:10, }} />
                </View>
                <View style={{ marginHorizontal: 10, flex:1}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', textAlign: 'center', maxHeight:44 }}>
                        {food.name}
                    </Text>
                    
                    
                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center',  maxWidth: '90%', marginTop:10 }} numberOfLines={1.5} ellipsizeMode='tail'>
                        {food.ingredients}
                    </Text>
                    </View>
                <View style={{marginTop:10,
                      marginHorizontal:20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'}}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        ${food.price}
                    </Text>
                    <View style={styles.addtobtn}>
                        <Icon name='add' size={20} color='white' />
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <View>
                    <Text style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 28 }}>Hello, </Text>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
                            {username} 
                        </Text>
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 22, color: '#FEDAC5' }}>
                        Help yourself to select an order
                    </Text>
                </View>
                <Image source={{ uri: imgUrl }} style={{ height: 50, width: 50, borderRadius: 25 }} />
            </View>
            <View style={{marginTop:40,
                          flexDirection: 'row',
                         paddingHorizontal: 20,
                          paddingBottom: 20}}>
                <View style={styles.inputcontainer}>
                    <Icon name='search' size={28} />
                    <TextInput 
                        style={{ flex: 1, fontSize: 18, color: 'gray' }}
                        placeholder='Search food...'
                        onChangeText={onSearch}
                    />
                </View>
                <View style={styles.sortBtn}>
                    <Icon name='tune' size={28} color='#FEDAC5' />
                </View>
            </View>
            {renderCategoryList()}
            <FlatList 
    showsVerticalScrollIndicator={false}
    numColumns={2}
    data={filteredList}
    renderItem={renderCard}
    keyExtractor={(item) => item.id.toString()}
/>
        </SafeAreaView>
    );
}


  const styles=StyleSheet.create({
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
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    

   }
  });


export default Menucard;



