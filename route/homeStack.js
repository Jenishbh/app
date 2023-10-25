import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
``;
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
import Menucard from "../screens/Customer/Menucard";
import Error from "../screens/Customer/Error";
//import Reservation from '../screens/Customer/Reservation'
//import Manager_home from '../screens/Manager/Manager_home';
//
import DetailsScreen from "../screens/Customer/detailsScreen";
import OnBording from "../screens/Customer/OnBording";
//import Signin from '../screens/Welcome/Signin';
import Profile from "../screens/Customer/Profile";
//import Manager_Menu from '../screens/Manager/Manager_menu';
//import Revenue from '../screens/Manager/Revenue';
//import Waitinglist from '../screens/Manager/Waiting_list';
//import Menu_edit from '../screens/Manager/Menu_edit';
//import Menu_input from '../screens/Manager/Menu_input';
//import Signup from '../screens/Welcome/Signup';
import Otp from "../screens/Welcome/Otp";
//import Tabnavigator from '../screens/Manager/Tabnavigator';
import ReservationHome from "../screens/Customer/ReservationHome";
import ReservationDetails from "../screens/Customer/ReservationDetails";
import RegistrationHistory from "../screens/Customer/RegistrationHistory";
import RegistrationDetails from "../screens/Customer/RegistrationDetails";

//import Dashboard from '../screens/Manager/dash/dashboard';
import CartScreen from "../screens/Customer/CartScreen";
import Confirm_res from "../screens/Customer/Confirm_res";
//import Scanner from '../screens/Manager/BarCodeScanPage';
//import TakeOrder from '../screens/Manager/OrderTakenPage';
//import CheckOut from '../screens/Manager/CheckOutPage';
//import Orderpage from '../screens/Manager/dash/Orderpage';
//import Sales from '../screens/Manager/dash/sales';
import OrderSubmit from "../screens/Customer/OrderSubmit";
//import Table_view from "../screens/Manager/manager_view_tables";
//import Manager_home from "../screens/Manager/manager_home";
//
//
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
        component={Otp}
        options={{
          tabBarIcon: (color) => (
            <Con name="question" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => (
  <Stack.Navigator>



    
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

  </Stack.Navigator>
);

export default AuthNavigator;
