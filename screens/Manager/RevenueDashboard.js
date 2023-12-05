import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';

import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../../database/firebase'; // Adjust this import as per your project structure
import Swiper from 'react-native-swiper';


const RevenueDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState({ start: new Date(), end: new Date() });

    const [topTrendingDishes, setTopTrendingDishes] = useState([]);
    const [topRevenueDishes, setTopRevenueDishes] = useState([]);
    const [mostValuableCustomers, setMostValuableCustomers] = useState([]);
    const [chartData, setChartData] = useState({});
  // Fetch data from Firebase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const snapshot = await db.collection('FoodDetails')
        .where('date', '>=', dateRange.start)
        .where('date', '<=', dateRange.end)
        .get();
        console.log(snapshot)
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      processChartData(fetchedData);
      processTopDishesData(fetchedData);
      processMostValuableCustomers(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, [dateRange]);


  const processTopDishesData = (fetchedData) => {
    let dishFrequency = {};
    let dishRevenue = {};

    fetchedData.forEach(item => {
      // Assuming `item.foodItem` is the name of the dish and `item.amount` is the revenue
      dishFrequency[item.name] = (dishFrequency[item.name] || 0) + 1;
      dishRevenue[item.name] = (dishRevenue[item.name] || 0) + parseFloat(item.salePrice);
    });

    // Sorting and getting top dishes
    const sortedFrequencyDishes = Object.entries(dishFrequency)
      .sort((a, b) => b[1] - a[1]) // Sort by frequency
      .slice(0, 5) // Get top 5
      .map(dish => ({ name: dish[0], count: dish[1] }));

    const sortedRevenueDishes = Object.entries(dishRevenue)
      .sort((a, b) => b[1] - a[1]) // Sort by revenue
      .slice(0, 5) // Get top 5
      .map(dish => ({ name: dish[0], revenue: dish[1].toFixed(2) }));

    setTopTrendingDishes(sortedFrequencyDishes);
    setTopRevenueDishes(sortedRevenueDishes);
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemSubText}>{`Count: ${item.count || ''} Revenue: $${item.revenue || ''}`}</Text>
    </View>
  );
  // Assuming your data has fields like `amount`, `date`, and `foodItem`
  const renderTimeRangeButtons = () => (
    <View style={styles.timeRangeContainer}>
      {['day', 'week', 'month', 'year'].map(range => (
        <TouchableOpacity key={range} onPress={() => setSelectedRange(range)} style={styles.timeRangeButton}>
          <Text>{range.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const renderSwipableCharts = () => {
    return (
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide}>
          {renderChart()} 
        </View>
        <View style={styles.slide}>
          
        </View>
       
      </Swiper>
    );
  };
  const setSelectedRange = (range) => {
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
    fetchData(); // This will re-fetch the data based on the new date range
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
  };

  const renderMostValuableCustomers = () => (
    <FlatList
      data={mostValuableCustomers}
      renderItem={({ item }) => (
        <View style={styles.customerItem}>
          <Text>{item.name}</Text>
          {/* Display other customer details */}
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
  
  const processChartData = (fetchedData) => {
    let revenuePerDay = {};
    fetchedData.forEach(item => {
      const dateStr = item.date.toISOString().split('T')[0]; // Adjust based on your date format
      revenuePerDay[dateStr] = (revenuePerDay[dateStr] || 0) + parseFloat(item.amount); // Adjust 'amount' field based on your data
    });
  
    const sortedDates = Object.keys(revenuePerDay).sort();
    const labels = sortedDates;
    const data = sortedDates.map(date => revenuePerDay[date]);
  
    setChartData({ labels, datasets: [{ data }] });
  };
  
  

  // Date change handler for date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || (isStartDate ? dateRange.start : dateRange.end);
    setDateRange({
      ...dateRange,
      [isStartDate ? 'start' : 'end']: currentDate
    });
  };

  // Render method for the chart
  const renderChart = () => {
    return (
      <BarChart
        data={chartData}
        width={300} // from react-native
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {/* App Logo and Header */}
  
          {/* Swipable Charts */}
          <View style={styles.chartContainer}>
            {renderSwipableCharts()}
          </View>
  
          {/* Time Range Buttons */}
          <View style={styles.timeRangeContainer}>
            {renderTimeRangeButtons()}
          </View>
  
          {/* Top Trending Dishes */}
          <Text style={styles.sectionTitle}>Top Trending Dishes</Text>
          <FlatList
            data={topTrendingDishes}
            renderItem={renderListItem}
            keyExtractor={item => item.name}
          />
  
          {/* Top Revenue Generating Dishes */}
          <Text style={styles.sectionTitle}>Top Revenue Generating Dishes</Text>
          <FlatList
            data={topRevenueDishes}
            renderItem={renderListItem}
            keyExtractor={item => item.name}
          />
  
          {/* Most Valuable Customers */}
          <Text style={styles.sectionTitle}>Most Valuable Customers</Text>
          {renderMostValuableCustomers()}
        </View>
      )}
    </SafeAreaView>
  );
  
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    margin: 10,
  },
  customerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  // Add more styles as needed
});

export default RevenueDashboard;
