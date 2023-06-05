import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, Dimensions, StyleSheet, TextInput, Image, ToastAndroid, ScrollView } from 'react-native';
import Colors from '../src/themes/Color';
import Logo from '../src/img/shopping.png'

//import libary
import axios from 'axios';
import Toast from 'react-native-toast-message';

// require module
// import { NetworkInfo } from "react-native-network-info";

// Get IPv4 IP
// const ipv4Address = await NetworkInfo.getIPV4Address();

const IPv4 = "192.168.1.18";

const RegisterScreen = ({ navigation }) => {
   const [user, setUser] = useState({
      email: "",
      password: "",
      username: "",
   });



   const OnChangeHandler = (value, name) => {
      setUser({
         ...user,
         [name]: value
      })
   }

   const register = (email, password, username) => {
      const option = {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password, username })
      }
      axios.post("http://" + IPv4 + ":5000/api/register", user)
         .then(res => console.log(res.json()))
         .catch((err) => {
            if (err.response) {
               console.log(err.response.data);
               Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: err.response.data,
                  position: 'top',
                  visibilityTime: 3000,
               });
               // console.log(err.response.data);
               console.log(err.response.status);
               // console.log(err.response.headers);
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
               // Đăng nhập thành công
               Toast.show({
                  type: 'success',
                  text1: 'Thành công',
                  position: 'top',
                  visibilityTime: 2000,
               });
               setTimeout(() => {
                  navigation.navigate('LoginScreen')
               }, 2000);
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
               <Text style={{ color: '#000000', fontSize: 34 }}> Sign Up</Text>
               {/* <Text style={{ color: '#000000' }}>Don't have an account?
                  <Text style={{ color: '#000000', fontStyle: 'italic', textDecorationLine: 'underline', color: Colors.Blue }}>{' '}Register now</Text>
               </Text> */}
               {/* Fomr Inputs View */}
               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderWidth: 1,
               }}>

                  <TextInput
                     autoFocus={true}
                     placeholderTextColor={'gray'}
                     placeholder='email'
                     textContentType='emailAddress'
                     style={{ color: '#000000' }}
                     onChangeText={(value) => OnChangeHandler(value, "email")}
                  />
               </View>
               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderWidth: 1,
               }}>

                  <TextInput
                     autoFocus={true}
                     placeholderTextColor={'gray'}
                     placeholder='password'
                     secureTextEntry={true}
                     style={{ color: '#000000' }}
                     onChangeText={(value) => OnChangeHandler(value, "password")}
                  />
               </View>

               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderWidth: 1,
               }}>

                  <TextInput
                     autoFocus={true}
                     placeholderTextColor={'gray'}
                     placeholder='fullname'
                     textContentType='name'
                     style={{ color: '#000000' }}
                     onChangeText={(value) => OnChangeHandler(value, "username")}
                  />
               </View>
            </View>
            {/* Button */}
            <View
               style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Button
                  title="Sign up"
                  color="#00B761"
                  onPress={() => register(user.email, user.password, user.username)}
               />
            </View>
         </View>
         <Toast />
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
      fontSize: 30,
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

export default RegisterScreen;
