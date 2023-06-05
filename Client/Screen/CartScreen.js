import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Button, ScrollView, Pressable,FlatList } from 'react-native';
import Colors from '../src/themes/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const CartScreen = ({ navigation, route }) => {
   const IPv4 = "192.168.1.18";
   const [cart,setCart] = useState();
   //get data from asyncStorage
   const getData = async() =>{
      try {
         const jsonValue = await AsyncStorage.getItem('cart')
         const cart = JSON.parse(jsonValue);
         console.log(cart);
         setCart(cart);
         return jsonValue != null ? JSON.parse(jsonValue) : null;
       } catch(err) {
         console.log(err);
       }
   }

   const xoaGioHang = () => {
      try {
         AsyncStorage.removeItem('cart')
         console.log('Đã xóa giỏ hàng.');
      } catch (e) {
         // remove error
         console.log(e)
      }
   }

   useEffect(() => {
     getData();
   }, [])
   
   const Item = ({item}) => {
      return(
      <View  style={style.card}>
         <Pressable
         key={item.id}
         style={{flexDirection: 'row', alignItems: 'center'}}
      >
         <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
         }}>
            <View style={{flexDirection: 'row',}}>
               <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.white_smoke,
                  marginLeft:15,
                  borderRadius: 5,
                  borderWidth: 0.2,
               }}>
                  <Image
                     source={{ uri: "http://" + IPv4 + ':5000/uploads/images/' + item.url_Image }}
                     resizeMode='contain'
                     style={{
                        height:100,
                        width:100,
                        
                     }}
                  />
               </View>
                  
               <View style={{marginLeft: 12}}>
                     <Text
                        style={{
                           fontSize:14,
                           color:Colors.dark,
                           fontWeight:'bold',
                        }}
                     >{item.sp}</Text>
                     <Text
                        style={{
                           fontSize:14,
                           color:Colors.dark,
                           fontWeight:'bold',
                        }}
                     >{item.giaTien.toLocaleString() + ' đ'}</Text>
               </View>

            </View>
         </View>
      </Pressable>
      </View>
      )
   }
   return (
      <View>
         <View style={style.header}>
            <Icon name="arrow-back" size={28} onPress={() => { navigation.goBack() }} />
            <Icon name="delete" size={28} onPress={() => xoaGioHang()}  />
         </View>

         <FlatList
            data={cart}
            renderItem={({ item }) =>  <Item item={item}/>}
         />
         
      </View>
   )
}

export default CartScreen;


const style = StyleSheet.create({
   header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   card:{
      marginTop: 35,
   }
});