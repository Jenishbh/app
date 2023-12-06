import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../../database/firebase'; // Adjust this import as per your project structure
import Swiper from 'react-native-swiper';


const RevenueDashboard = () => {
  const now = new Date();
const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

const [dateRange, setDateRange] = useState({ start: oneYearAgo, end: now });
const [selectedRange, setSelectedRange] = useState('year');

    const [isLoading, setIsLoading] = useState(false);


    const [topTrendingDishes, setTopTrendingDishes] = useState([]);
    const [topRevenueDishes, setTopRevenueDishes] = useState([]);
    const [mostValuableCustomers, setMostValuableCustomers] = useState([]);
    const [chartData, setChartData] = useState({});
  // Fetch data from Firebase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const snapshot = await db.collection('FoodHistory').get();
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      filterDataByTimestamp(items); // New function to filter data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };
  const filterDataByTimestamp = (items) => {
    const filteredItems = items.filter(item => {
      const itemDate = item.timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return itemDate >= dateRange.start && itemDate <= dateRange.end;
    });
  
    if (filteredItems.length > 0) {
      // Assuming all items have a similar structure and foodDetails is an array
      const foodDetailsArray = filteredItems.map(item => item.foodDetails).flat();
      
      processChartData(foodDetailsArray);
      processTopDishesData(foodDetailsArray);
      processMostValuableCustomers(filteredItems);
    } else {
      // Handle the scenario where there are no filtered items
      // You might want to reset your state or show a message
      setTopTrendingDishes([]);
      setTopRevenueDishes([]);
      setMostValuableCustomers([]);
      setChartData({});
    }
  };
  
  
  
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [dateRange]); // fetchData is called whenever dateRange changes
  


  const processTopDishesData = (fetchedData) => {
    let dishFrequency = {};
    let dishRevenue = {};

    fetchedData.forEach(item => {
        let dishName = item.name;
        let quantitySold = parseInt(item.qty, 10); // Parse qty as an integer
        let totalRevenue = parseFloat(item.totalPrice); // Parse totalPrice as a float

        // Update frequency and revenue for each dish
        dishFrequency[dishName] = (dishFrequency[dishName] || 0) + quantitySold;
        dishRevenue[dishName] = (dishRevenue[dishName] || 0) + totalRevenue;
    });

    // Sorting and getting top dishes by frequency
    const sortedFrequencyDishes = Object.entries(dishFrequency)
        .sort((a, b) => b[1] - a[1]) // Sort by frequency (count)
        .slice(0, 5) // Get top 5
        .map(dish => ({ name: dish[0], count: dish[1] }));

    // Sorting and getting top dishes by revenue
    const sortedRevenueDishes = Object.entries(dishRevenue)
        .sort((a, b) => b[1] - a[1]) // Sort by revenue
        .slice(0, 5) // Get top 5
        .map(dish => ({ name: dish[0], revenue: dish[1].toFixed(2) }));

    setTopTrendingDishes(sortedFrequencyDishes);
    setTopRevenueDishes(sortedRevenueDishes);
};

  const renderListItem = ({ item  }) =>{ 
    console.log(item)
    return(
    
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemSubText}>{`Count: ${item.count || ''} Revenue: $${item.revenue || ''}`}</Text>
    </View>
  )};
  // Assuming your data has fields like `amount`, `date`, and `foodItem`
  const renderTimeRangeButtons = () => (
    <View style={styles.timeRangeContainer}>
      {['day', 'week', 'month', 'year'].map(range => (
        <TouchableOpacity 
          key={range} 
          onPress={() => handleRangeSelection(range)} 
          style={[
            styles.timeRangeButton, 
            selectedRange === range ? styles.selectedTimeRangeButton : {}
          ]}
        >
          <Text>{range.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const handleRangeSelection = (range) => {
    setSelectedRange(range);
    const now = new Date();
    let start = new Date();
    
    switch (range) {
      case 'day':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'year':
        start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        start = now;
    }
  
    setDateRange({ start, end: now });
    setIsLoading(true)
    fetchData(); // Re-fetch data with the new date range
  };

  

  const processMostValuableCustomers = (fetchedData) => {
    let customerSpending = {};
    
    fetchedData.forEach(item => {
      const customerKey = item.userEmail; // Replace with your identifier
      customerSpending[customerKey] = (customerSpending[customerKey] || 0) + parseFloat(item.totalAmount); // Replace 'totalAmount' with your field
    });

  
    const sortedCustomers = Object.entries(customerSpending)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([email, amount]) => ({ email, amount: amount.toFixed(2) }));
  
    setMostValuableCustomers(sortedCustomers);
    console.log(sortedCustomers)
  };

  const renderMostValuableCustomers = () =>{ 
    
    
    return(
    <FlatList
      data={mostValuableCustomers}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{item.email}</Text>
          <Text style={styles.listItemSubText}>${item.amount}</Text>
          {/* Display other customer details */}
        </View>
      )}
      keyExtractor={item => item.id}
    />
  )};
  
  const processChartData = (fetchedData) => {
    let countData = {};
    let revenueData = {};
  
    fetchedData.forEach(item => {
      let dishName = item.name;
      let quantitySold = parseInt(item.qty, 10);
      let totalRevenue = parseFloat(item.totalPrice);
  
      countData[dishName] = (countData[dishName] || 0) + quantitySold;
      revenueData[dishName] = (revenueData[dishName] || 0) + totalRevenue;
    });
  
    const countLabels = Object.keys(countData);
    const countValues = countLabels.map(name => countData[name]);
  
    const revenueLabels = Object.keys(revenueData);
    const revenueValues = revenueLabels.map(name => revenueData[name]);
  
    setChartData({
      count: { labels: countLabels, datasets: [{ data: countValues }] },
      revenue: { labels: revenueLabels, datasets: [{ data: revenueValues }] }
    });
  };
  
  
 

  

  

  // Date change handler for date picker

  const renderListOrMessage = (items, message) => {
    if (items.length === 0) {
      return <Text>{message}</Text>;
    }
  
    return items.map((item, index) => renderListItem({ item, key: item.name + index }));
  };
  
  // Render method for the chart
  const renderChart = (data, chartType) => {
    if (!data || data.datasets[0].data.length === 0) {
      return <Text>No data for this period</Text>;
    }
    const dataValues = data.datasets[0].data.flat();
  
    const chartData = {
      labels: data.labels,
      datasets: [{ data: dataValues }],
    };
  
    return (
      <BarChart
        data={chartData}
        width={300} // from react-native
        height={220}
        yAxisLabel={chartType === 'count' ? '' : '$'}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        fromZero={true}
        
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    );
  };
  
  return (
    isLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
    <FlatList
      data={[]} // No data needed for the main list
      ListHeaderComponent={
        <>
          {/* App Logo and Header */}
          <Image source={require('../../assets/third.png')} style={{width:120, height:120, justifyContent:'center', alignSelf:'center'}}/>
  
          {/* Swipable Charts */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} pagingEnabled>
  <View style={styles.chartContainer}>
    {/* Chart for Most Trending Dish by Count */}
    <View style={styles.chartBox}>
      {chartData.count && renderChart(chartData.count, 'count')}
    </View>

    {/* Chart for Most Trending Dish by Total Revenue */}
    <View style={styles.chartBox}>
      {chartData.revenue && renderChart(chartData.revenue, 'revenue')}
    </View>
  </View>
</ScrollView>


  
          {/* Time Range Buttons */}
          <View style={styles.timeRangeContainer}>
            {renderTimeRangeButtons()}
          </View>
  
          {/* Top Trending Dishes Section */}
<Text style={styles.sectionTitle}>Top Trending Dishes</Text>
{renderListOrMessage(topTrendingDishes, 'No trending dishes for this period')}

{/* Top Revenue Generating Dishes Section */}
<Text style={styles.sectionTitle}>Top Revenue Generating Dishes</Text>
{renderListOrMessage(topRevenueDishes, 'No revenue data for this period')}

{/* Most Valuable Customers Section */}
<Text style={styles.sectionTitle}>Most Valuable Customers</Text>
{mostValuableCustomers.length === 0 ? <Text>No customer data for this period</Text> : renderMostValuableCustomers()}

        </>
      }
      renderItem={null} // No items to render in the main list
      keyExtractor={(item, index) => index.toString()}
    />
  )
  );
  
  
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:10,

      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // or any background color you prefer
      },
      logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
      },
      logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
      },
      chartBox: {
        backgroundColor: '#e6e6e6',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        
        // Add more styles for chart box
      },
      separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20,
      },
      chartContainer: {
        // Style for the chart container
        flexDirection: 'row',
        marginVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        // Add other necessary styles
      },
      timeRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        
        // Other styles
      },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemSubText: {
    fontSize: 14,
    color: 'gray',
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  timeRangeButton: {
    padding: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal:5
  },
  sectionTitle: {
    fontSize: 18,
    margin: 10,
  },
  customerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor:'lightgray',
    margin:10,
    borderRadius:8
  },
  selectedTimeRangeButton: {
    backgroundColor: '#e26a00', // or any color to indicate selection
    // other styles for selected button
  },
  
  // Add more styles as needed
});

export default RevenueDashboard;
