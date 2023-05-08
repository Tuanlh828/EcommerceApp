import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, ImageBackground, Dimensions, StyleSheet, TextInput, Image } from 'react-native';
import Colors from '../src/themes/Color';
import Logo from '../src/img/shopping.png'
import axios from 'axios';


const IPv4 = "192.168.1.18";



const RegisterScreen = ({ navigation }) => {

   const [user, setUser] = useState({
      email: "",
      password: "",
      username: "",
   });
   console.log(user);

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
         .catch((err) => console.log(err))
      //Button onpress() => onPress={() => { loginHandle(data.username, data.password) }}
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
