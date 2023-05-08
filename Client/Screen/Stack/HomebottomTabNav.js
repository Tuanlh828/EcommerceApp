import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

import HomeScreen from '../HomeScreen'

function Profile({ navigation }) {
   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Profile Screen</Text>
         <Button
            onPress={() => navigation.navigate('EditPost')}
            title="Go to Edit Post"
         />
      </View>
   );
}

function EmptyScreen() {
   return <View />;
}

const Home = () => {
   return (
      <Tab.Navigator screenOptions={{
         headerShown: false
      }}>
         <Tab.Screen name="shop" component={HomeScreen}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cart" color={color} size={size} />
               ),
            }}
         />
         <Tab.Screen name="Profile" component={Profile}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
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