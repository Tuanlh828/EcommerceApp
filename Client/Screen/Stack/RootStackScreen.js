import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './HomebottomTabNav';
import HomeScreen from '../HomeScreen';
import DetailsScreen from '../DetailsScreen';
import SplashScreen from '../SplashScreen';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import CartScreen from '../CartScreen';
const RootStack = createStackNavigator();


const RootStackScreen = ({ navigation }) => (
   <RootStack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
         headerShown: false
      }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen}></RootStack.Screen>
      <RootStack.Screen name="LoginScreen" component={LoginScreen}></RootStack.Screen>
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen}></RootStack.Screen>

      <RootStack.Screen name="HomeScreen" component={Home}></RootStack.Screen>
      <RootStack.Screen name="DetailsScreen" component={DetailsScreen}></RootStack.Screen>
      <RootStack.Screen name="CartScreen" component={CartScreen}></RootStack.Screen>
   </RootStack.Navigator>


);

export default RootStackScreen;