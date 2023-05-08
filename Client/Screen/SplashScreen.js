import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image, View, Text, ImageBackground } from 'react-native';
import Colors from '../src/themes/Color'

import Logo from '../src/img/shopping.png'
const SplashScreen = ({ navigation }) => {
   setTimeout(() => {
      navigation.navigate('LoginScreen')
   }, 2000);

   return (
      <View style={styles.container}>
         <Image source={Logo} style={{ width: 100, height: 100 }} />
         <Text style={styles.logoText}>GoShop</Text>
      </View>
   );
};



const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.green,

   },

   logoText: {
      color: '#FFFFFF',
      fontFamily: "OpenSans-Bold",
      fontSize: 30,
      marginTop: 29.1,
      fontWeight: 'bold',
      textTransform: 'uppercase'
   }
})

export default SplashScreen;