// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Icon from "react-native-vector-icons/FontAwesome";
// import LoginScreen from "./component/LoginScreen";
// import SignupScreen from "./component/SignupScreen";
// import OnboardingScreen from "./component/OnBoardingScreen";
// import HomeScreen from "./component/Home";
// import UserProfileScreen from "./component/UserProfile";
// import ShoppingCart from "./component/ShoppingCart";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import CustomHeader from "./component/Navigation";

// const Stack = createNativeStackNavigator();

// const Tab = createBottomTabNavigator();

// function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login">
//           {/* <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Signup" component={SignupScreen} /> */}
//           {/* <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} /> */}
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />

//           {/* <Stack.Screen name="ShoppingCart" component={ShoppingCart} /> */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
//   //// turn (
//   //// <NavigationContainer>
//   ////   <Tab.Navigator
//   ////     screenOptions={({ route }) => ({
//   ////       tabBarIcon: ({ focused, color, size }) => {
//   ////         let iconName;

//   ////         if (route.name === "Home") {
//   ////           iconName = "home";
//   ////         } else if (route.name === "Cart") {
//   ////           iconName = "shopping-cart";
//   ////         } else if (route.name === "UserProfile") {
//   ////           iconName = "user";
//   ////         }

//   ////         // You can return any component that you like here!
//   ////         return <Icon name={iconName} size={size} color={color} />;
//   ////       },
//   ////     })}
//   ////     tabBarOptions={{
//   ////       activeTintColor: "tomato",
//   ////       inactiveTintColor: "gray",
//   ////     }}
//   ////   >
//   ////     <Tab.Screen name="Home" component={HomeScreen} />
//   ////     <Tab.Screen name="Cart" component={ShoppingCart} />
//   ////     <Tab.Screen name="UserProfile" component={UserProfileScreen} />
//   ////   </Tab.Navigator>
//   //// </NavigationContainer>
//   ////
// }

// export default App;

// App.js (Main Component where Navigation is set up)
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./component/Home/HomeScreen";
import ProductView from "./component/Home/ProductView";
import CartScreen from "./component/Home/CartScreen";
import LoginScreen from "./component/LoginScreen";
import SignUpScreen from "./component/SignUpScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="ProductView" component={ProductView} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
