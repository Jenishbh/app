import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import AuthNavigator from './route/homeStack';
import ErrorBoundary from "./ErrorBoundary";
//function App() {
  //return< Login />
  //return "Hello"
  //return <Login />
  //return (
  //  <div className="App">
  //    <h3>Build Sign Up & Login UI Template in React</h3>
  //  </div>
  //);
//}

export default function App() 
{
  return(
    <ErrorBoundary>
    <NavigationContainer>
    <AuthNavigator />
    </NavigationContainer>
    </ErrorBoundary>
 )
 
};