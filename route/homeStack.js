import React from 'react'
import 'react-native-gesture-handler'
import { createStackNavigator } from "@react-navigation/stack"; ``
import Login from '../screens/Welcome/Login';
import Forget_pass from "../screens/Welcome/Forget_pass";
import Registration from "../screens/Welcome/Signup";
//import customer_home from '../screens/Customer/customer_home';
//import { SafeAreaView } from 'react-navigation';
//import { NavigationContainer } from '@react-navigation/native';
//import { tabBarOption, Image, View } from 'react-native'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/MaterialIcons';
//import Con from 'react-native-vector-icons/Octicons';
//import Menucard from '../screens/Customer/Menucard';
//import Reservation from '../screens/Customer/Reservation'
//import Manager_home from '../screens/Manager/Manager_home';
//
//import DetailsScreen from '../screens/Customer/detailsScreen';
//import OnBording from '../screens/Customer/OnBording';
//import Signin from '../screens/Welcome/Signin';
//import Profile from '../screens/Customer/Profile'
//import Manager_Menu from '../screens/Manager/Manager_menu';
//import Revenue from '../screens/Manager/Revenue';
//import Waitinglist from '../screens/Manager/Waiting_list';
//import Menu_edit from '../screens/Manager/Menu_edit';
//import Menu_input from '../screens/Manager/Menu_input';
//import Signup from '../screens/Welcome/Signup';
//import Otp from '../screens/Welcome/Otp';
//import Tabnavigator from '../screens/Manager/Tabnavigator';
//import ReservationHome from '../screens/Customer/ReservationHome';
//import ReservationDetails from '../screens/Customer/ReservationDetails';
//import Confirm_res from '../screens/Customer/confirm_res';
//import Dashboard from '../screens/Manager/dash/dashboard';
//import CartScreen from '../screens/Customer/CartScreen';
//
//import Scanner from '../screens/Manager/BarCodeScanPage';
//import TakeOrder from '../screens/Manager/OrderTakenPage';
//import CheckOut from '../screens/Manager/CheckOutPage';
//import Orderpage from '../screens/Manager/dash/Orderpage';
//import Sales from '../screens/Manager/dash/sales';
//import OrderSubmit from '../screens/Customer/OrderSubmit';
//
//
const Stack= createStackNavigator();

const AuthNavigator = ()=>(
    
    <Stack.Navigator>

         <Stack.Screen name='Signin' component={Login} options={{headerShown: false}} />
         <Stack.Screen name='Signup' component={Registration} options={{headerShown: false}} />
         <Stack.Screen name='Forgot_pass' component={Forget_pass} options={{headerShown: false}} />
         
        
        
        
        
        
        
        

    

  </Stack.Navigator>

)

export default AuthNavigator;