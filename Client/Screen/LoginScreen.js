import React, { useState, useEffect } from 'react';
import {
   View, 
   TouchableOpacity, 
   Text, ScrollView, 
   Button, 
   Alert, 
   Dimensions, 
   StyleSheet, 
   TextInput, 
   Image
} from 'react-native';
import Colors from '../src/themes/Color';
import Logo from '../src/img/shopping.png'
import RegisterScreen from './RegisterScreen';
import ipv4 from '../src/config/ipConfig';
//import libary
import axios from 'axios';
import Toast from 'react-native-toast-message';

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

      axios.post("http://" + ipv4 + ":5000/api/login", params,
         {
            "headers": { "content-type": "application/json" }
         }
      )
         .then(res => {console.log(res.json())}
         )
         .catch((err) => {
            console.log(err.request);
            if(err.request) {
               Alert.alert(' ', 'Tài khoản hoặc mật khẩu không hợp lệ!',
                [{text: 'OK', onPress: () => console.log('OK Pressed')},]);
            }else{
               setTimeout(()=> {
                  navigation.navigate('HomeScreen')
               }, 500);
            }
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
               <Text style={{ color: '#000000', fontSize: 34 }}>Xin chào</Text>
               <Text style={{ color: '#000000' }}>Bạn chưa có tài khoản đăng ký 
                     <Text 
                     onPress={() => navigation.navigate('RegisterScreen')} 
                     style={{ color: '#000000', color: Colors.Blue }}> tại đây!
                     </Text>
               </Text>
               
               {/* Fomr Inputs View */}
               <View style={{
                  marginTop: 10,
                  borderBottomColor: '#000000',
                  borderBottomWidth: 1,
               }}>
                  <Text style={{ color: '#000000' }}>Email:</Text>
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
                  <Text style={{ color: '#000000' }}>Mật khẩu:</Text>
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
                  title="Đăng nhập"
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