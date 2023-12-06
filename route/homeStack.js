import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Welcome/Login";
import Forget_pass from "../screens/Welcome/Forget_pass";
import Registration from "../screens/Welcome/Signup";
//import customer_home from '../screens/Customer/customer_home';
//import { SafeAreaView } from 'react-navigation';
//import { NavigationContainer } from '@react-navigation/native';
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Con from "react-native-vector-icons/Octicons";
import Ion from 'react-native-vector-icons/MaterialCommunityIcons'
import Menucard from "../screens/Customer/Menucard";
import Error from "../screens/Customer/Error";
//import Reservation from '../screens/Customer/Reservation'
//import Manager_home from '../screens/Manager/Manager_home';
import Manager_home from "../screens/Manager/manager_home";
import QRScannerScreen from "../screens/Manager/QRScannerScreen";
import DetailsScreen from "../screens/Customer/detailsScreen";
import OnBording from "../screens/Customer/OnBording";
import MenuUpdateHome from "../screens/Manager/MenuUpdateHome";
import Profile from "../screens/Customer/Profile";

import Otp from "../screens/Welcome/Otp";
import AssignTable from "../screens/Manager/AssignTable";
import ReservationHome from "../screens/Customer/ReservationHome";
import ReservationDetails from "../screens/Customer/ReservationDetails";
import RegistrationHistory from "../screens/Customer/RegistrationHistory";
import RegistrationDetails from "../screens/Customer/RegistrationDetails";
import TableManagementScreen from "../screens/Manager/TableManagementScreen";
import TableSelectionScreen from "../screens/Manager/TableSelectionScreen";
import FoodSelectionScreen from "../screens/Manager/FoodSelectionScreen";
import ManagerMenu from "../screens/Manager/ManagerMenu";
import ManagerCart from "../screens/Manager/ManagerCart";
import CheckoutScreen from "../screens/Manager/Checkout";
import BufferScreen from "../screens/Manager/Buffer";
import ManagerEditMenu from '../screens/Manager/manager_edit_menue'
import CartScreen from "../screens/Customer/CartScreen";
import Confirm_res from "../screens/Customer/Confirm_res";
import LiveTable from "../screens/Manager/LiveTable";
import TableDetailsScreen from "../screens/Manager/TableDetails";
import OrderSubmit from "../screens/Customer/OrderSubmit";
import RevenueDashboard from "../screens/Manager/RevenueDashboard";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BottomNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      tabBarOption={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
          
        },
        showLabel: false,
        activeTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menucard}
        options={{
          tabBarIcon: () => <Icon name="restaurant" color="orange" size={28} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reservation"
        component={ReservationHome}
        options={{
          tabBarIcon: (color) => (
            <Icon name="date-range" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: (color) => (
            <View
              style={{
                height: 50,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderColor: "orange",
                borderWidth: 2,
                borderRadius: 30,
                top: -25,
                elevation: 5,
              }}
            >
              <Icon name="shopping-cart" color={color} size={28} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: (color) => <Icon name="face" color={color} size={28} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={RegistrationHistory}
        options={{
          tabBarIcon: (color) => (
            <Con name="question" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


//----------------------------------------------------------------------------

const Manage_BottomNavigator = ({ navigation }) => {
  return (
    
    <Tab.Navigator
    initialRouteName="Home"
      tabBarOption={{
        
        style: {
          
          borderTopWidth: 0,
          elevation: 0,
          
        },
        showLabel: false,
        activeTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="Sales Dashboard"
        component={RevenueDashboard}
        options={{
          tabBarIcon: () => <Icon name="dashboard"  size={28} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="EditMenu"
        component={MenuUpdateHome}
        options={{
          tabBarIcon: () => <Icon name="edit"  size={28} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Manager_home}
        options={{
          tabBarIcon: (color) => (
            <View
              style={{
                height: 50,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderColor: "orange",
                borderWidth: 2,
                borderRadius: 30,
                top: -5,
                elevation: 5,
              }}
            >
              <Icon name="home" color={color} size={28} />
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Walk-In"
        component={AssignTable}
        options={{
          tabBarIcon: (color) => (
            <Icon name="restaurant" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Live tables"
        component={LiveTable}
        options={{
          tabBarIcon: (color) => (
            <Ion name="table-picnic" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />

    </Tab.Navigator>
  );
};

const AuthNavigator = () => (
  <Stack.Navigator>





<Stack.Screen
      name="Manager_home"
      component={Manage_BottomNavigator}
      options={{ headerShown: false }}
    />
<Stack.Screen
      name="RevenueDashboard"
      component={RevenueDashboard}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="Signin"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={Registration}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Forgot_pass"
      component={Forget_pass}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Otp" component={Otp} options={{ headerShown: false }} />
    <Stack.Screen
      name="OnBording"
      component={OnBording}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Menucard"
      component={Menucard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DetailsScreen"
      component={DetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Home"
      component={BottomNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ReservationHome"
      component={ReservationHome}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ReservationDetails"
      component={ReservationDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Confirm_res"
      component={Confirm_res}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Error"
      component={Error}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OrderSubmit"
      component={OrderSubmit}
      options={{ headerShown: false }}
    />
        <Stack.Screen
      name="RegistrationHistory"

      component={RegistrationHistory}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegistrationDetails"
      component={RegistrationDetails}
      options={{ headerShown: false }}
    />



    <Stack.Screen
      name="TableManagementScreen"
      component={TableManagementScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ManagerMenu"
      component={ManagerMenu}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ManagerCart"
      component={ManagerCart}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CheckoutScreen"
      component={CheckoutScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="QRScannerScreen"
      component={QRScannerScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FoodSelectionScreen"
      component={FoodSelectionScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BufferScreen"
      component={BufferScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TableSelectionScreen"
      component={TableSelectionScreen}
      options={{ headerShown: false }}
    />
<Stack.Screen
      name="LiveTable"
      component={LiveTable}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TableDetailsScreen"
      component={TableDetailsScreen}
      options={{ headerShown: false }}
    />

        <Stack.Screen
      name="AssignTable"
      component={AssignTable}
      options={{ headerShown: false }}
    />
        <Stack.Screen
      name="ManagerEditMenu"
      component={ManagerEditMenu}
      options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default AuthNavigator;
