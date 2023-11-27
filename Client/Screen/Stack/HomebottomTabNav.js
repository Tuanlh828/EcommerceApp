import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

import HomeScreen from '../HomeScreen'
import OrderScreen from '../OrderScreen'

function EmptyScreen() {
   return <View />;
}

const Home = () => {
   return (
      <Tab.Navigator screenOptions={{
         headerShown: false
      }}>
         <Tab.Screen name="Home" component={HomeScreen}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="shopping" color={color} size={size} />
               ),
            }}
         />
         <Tab.Screen name="Hóa đơn" component={OrderScreen}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="basket" color={color} size={size} />
               ),
            }}
         />
         <Tab.Screen name="Settings" component={EmptyScreen}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}

export default Home;