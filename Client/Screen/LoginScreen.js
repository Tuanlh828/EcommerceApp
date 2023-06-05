import React, { useState, useEffect } from 'react';
import {
   View, TouchableOpacity, Text, ScrollView, Button, ImageBackground, Dimensions, StyleSheet, TextInput, Image
} from 'react-native';
import Colors from '../src/themes/Color';
import Logo from '../src/img/shopping.png'
import RegisterScreen from './RegisterScreen';

//import libary
import axios from 'axios';
import Toast from 'react-native-toast-message';

const IPv4 = "192.168.1.18";
const LoginScreen = ({ navigation }) => {

   const [data, setData] = useState({
      email: "",
      password: "",
   });

   const OnChangeHandler = (value, name) => {
      setData({
         ...data,
         [name]: value
      })
   }

   const login = (email, password) => {
      const params = JSON.stringify({ email: email, password: password })

      axios.post("http://" + IPv4 + ":5000/api/login", params,
         {
            "headers": { "content-type": "application/json" }
         }
      )
         .then(res => console.log(res.json()))
         .catch((err) => {
            if (err.response) {
               Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: err.response.data,
                  position: 'top',
                  visibilityTime: 3000,
               });

               console.log(err.response.data);
               console.log(err.response.status);
            } else if (err.request) {
               Toast.show({
                  type: 'info',
                  text1: 'Error request',
                  text2: err.message,
                  position: 'top',
                  visibilityTime: 3000,

               });
               console.log(err.request.status);
            } else {
               setTimeout(() => {
                  navigation.navigate('HomeScreen')
               }, 2000);
               console.log('Error', err.request);
            }
            console.log(err.config);
         })
   }

   return (
      //Container
      <ScrollView
         style={{ flex: 1, backgroundColor: '#ffffff' }}
         showsVerticalScrollIndicator={false}>
         <View style={{
            backgroundColor: Colors.green,
            height: Dimensions.get('window').height / 2.5
         }}>
            <View style={styles.brandView}>
               <Image source={Logo} style={{ width: 100, height: 100 }} />
               <Text style={styles.brandViewText}>GoShop</Text>
            </View>
         </View>

         {/* Bottom View */}
         <View style={styles.bottomView}>
            {/* Welcome View */}
            <View style={{ padding: 40 }}>
               <Text style={{ color: '#000000', fontSize: 34 }}> Welcome</Text>
               <Text style={{ color: '#000000' }}>Don't have an account?
                  <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                     <Text style={{ color: '#000000', fontStyle: 'italic', textDecorationLine: 'underline', color: Colors.Blue }}>{' '}Register now</Text>
                  </TouchableOpacity>
               </Text>
               {/* Fomr Inputs View */}
               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderBottomWidth: 1,
               }}>
                  <Text style={{ color: '#000000' }}>Email</Text>
                  <TextInput
                     onChangeText={(value) => OnChangeHandler(value, "email")}
                     autoFocus={true}
                     placeholderTextColor={'gray'}
                     placeholder='user@gmail.com'
                     textContentType='emailAddress'
                     style={{ color: '#000000' }} />
               </View>
               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderBottomWidth: 1,
               }}>
                  <Text style={{ color: '#000000' }}>Password</Text>
                  <TextInput
                     onChangeText={(value) => OnChangeHandler(value, "password")}
                     autoFocus={true}
                     placeholderTextColor={'gray'}
                     placeholder='******'
                     secureTextEntry={true}
                     style={{ color: '#000000' }} />
               </View>
            </View>
            {/* Button */}
            <View
               style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
               }}
            >
               <Button
                  title="Sign in"
                  color="#00B761"
                  onPress={() => login(data.email, data.password)}

               />
            </View>
         </View>
      </ScrollView>
   );
};



const styles = StyleSheet.create({
   brandView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   brandViewText: {
      color: '#ffffff',
      fontSize: 40,
      fontWeight: 'bold',
      textTransform: 'uppercase',
   },

   bottomView: {
      flex: 1.5,
      backgroundColor: '#ffffff',
      bottom: 50,
      borderTopStartRadius: 60,
      borderTopEndRadius: 60,
   }
})

export default LoginScreen;