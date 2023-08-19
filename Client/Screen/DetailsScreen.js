import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native';
import Colors from '../src/themes/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
const DetailsScreen = ({ navigation, route }) => {
   const id = route.params.id
   const IPv4 = "192.168.1.18";
   const [num, setNum] = useState(1);
   const [product, setProduct] = useState({});
   const [size, setSize] = useState();
   const [sizeIndex, setSizeIndex] = useState();
   const [sizeName, setSizeName] = useState();

   const incrementNumber = (num) => {
      if (num >= 1) {
         setNum(num => num + 1)
      } else if (num < 1) {
         setNum(num)
      }
      return
   }
   const decrementNumber = num => {
      if (num > 1) {
         setNum(num => num - 1)
      } else if (num == 1) {
         setNum(num)
      }
      return
   }


   const checkThongtinGioHang = async () => {
      await AsyncStorage.getAllKeys((err, keys) => {
         AsyncStorage.multiGet(keys, (error, stores) => {
            stores.map((result, i, store) => {
               console.log({ [store[i][0]]: store[i][1] });
               return true;
            });
         });
      });
   }

   const themSPgiohang = async (item, num, sizeName) => {
      let itemCart = {
         id: item._id,
         sp: item.title,
         url_Image: item.img,
         size: sizeName,
         soLuong: num,
         giaTien: item.price
      }


      await AsyncStorage.getItem('cart').then((data) => {
         if (data !== null) {
            console.log(data);
            var cart = JSON.parse(data);
            const check = cart.filter(item => item.sp.size == itemCart.size)[0]
            if (check) {
               cart = cart.map((item) => {
                  if (item.sp.size == itemCart.size) {
                     item = { ...item, soLuong: item.soLuong + num }
                  }
                  return item
               })
            } else {
               cart = [...cart, itemCart]
            }
            AsyncStorage.setItem('cart', JSON.stringify(cart));
         } else {
            const cart = []
            cart.push(itemCart);
            console.log(cart)
            AsyncStorage.setItem('cart', JSON.stringify(cart));
         }
         alert("Đã thêm vào giỏ hàng")
         //Toast someTh
      })
         .catch((err) => {
            console.log(err);
         })
   }
  

   const SizeList = ({ item }) => {
      if (!item) {

      } else {
         return (
            <View style={style.categoryContainer}>
               {item.map((item, index) => (
                  <TouchableOpacity key={index}
                     activeOpacity={0.8}
                     onPress={() => {
                        setSizeIndex(index),
                           setSizeName(item["size"])
                     }
                     }>
                     <Text style={[style.categoryText, sizeIndex == index && style.categoryTextSelected]}>{item.size}</Text>
                     {/* <Text style={[style.categoryText, sizeIndex == index && style.categoryTextSelected]}>{item.size}</Text> */}
                  </TouchableOpacity>

               ))}
            </View>
         )
      }
   };
   const getProductById = (() => {
      axios.get("http://" + IPv4 + ":5000/api/products/find/" + id)
         .then(response => {
            setProduct(response.data)
            setSize(response.data.details)
         }
         )
   })

   useEffect(() => {
      getProductById();
   }, [])
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors }}>
         <View style={style.header}>
            <Icon name="arrow-back" size={28} onPress={() => { navigation.goBack() }} color={Colors.dark} />
            {/* <Icon name="shopping-cart" size={28} onPress={() => checkThongtinGioHang()} color={Colors.dark} /> */}
         </View>

         <View style={style.imageContainer}>
            <Image source={{ uri: "http://" + IPv4 + ':5000/uploads/images/' + product.img }} style={{ resizeMode: 'contain', flex: 1, width: '100%', height: '100%' }} />
         </View>

         <View style={style.detailsContainer}>
            <View
               style={{
                  // marginLeft: 20,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
               }}>
               <View style={style.line} />
               {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.dark }}>Best Choice</Text> */}
            </View>
            <View style={{
               marginLeft: 20,
               marginTop: 20,
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center',
            }}>
               <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.dark }}>{product.title}</Text>
               <View style={style.priceTag}>
                  <Text style={{
                     marginLeft: 10,
                     color: Colors.white,
                     fontWeight: 'bold',
                     fontSize: 14,
                  }}>{product.price}đ</Text>
               </View>
            </View>
            <View style={{ paddingHorizontal: 20, marginTop: 10, }}>
               <Text style={{ fontSize: 16, fontWeight: '', color: Colors.dark }}>Size:</Text>
               <SizeList item={size} />


               <View style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
               }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     <View style={style.borderBtn}>
                        <TouchableOpacity onPress={() => decrementNumber(num)}>
                           <Text style={style.borderBtnText}> - </Text>
                        </TouchableOpacity>
                     </View>
                     <Text
                        style={{
                           fontSize: 18,
                           marginHorizontal: 10,
                           fontWeight: 'bold',
                           color: Colors.dark,
                        }}>
                        {num}
                     </Text>
                     <View style={style.borderBtn}>
                        <TouchableOpacity onPress={() => incrementNumber(num)}>
                           <Text style={style.borderBtnText}> + </Text>
                        </TouchableOpacity>
                     </View>
                  </View>
                  <View style={style.buyBtn}>
                     <TouchableOpacity onPress={() => themSPgiohang(product, num, sizeName)} >
                        <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold' }}>
                           Thêm vào giỏ hàng
                        </Text>
                     </TouchableOpacity>

                  </View>
               </View>
            </View>
         </View>
      </SafeAreaView>

   );
};

const style = StyleSheet.create({
   header: {
      paddingHorizontal: 10,
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   imageContainer: {
      flex: 0.45,
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
   },

   detailsContainer: {
      flex: 0.55,
      backgroundColor: Colors.light,
      marginHorizontal: 7,
      marginBottom: 7,
      borderRadius: 20,
      marginTop: 10,
      paddingTop: 20,
   },

   line: {
      width: "100%",
      height: 2,
      backgroundColor: Colors.dark,
      marginBottom: 5,
      marginRight: 3,
   },

   priceTag: {
      backgroundColor: Colors.green,
      width: 80,
      height: 40,
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
      justifyContent: 'center',
   },

   borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      height: 40,
      width: 60,
      justifyContent: "center",
      alignItems: 'center',
   },
   borderBtnText: {
      fontWeight: 'bold',
      fontSize: 28,
      color: Colors.dark
   },
   buyBtn: {
      width: 180,
      height: 50,
      backgroundColor: Colors.green,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
   },
   categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-evenly',
   },
   categoryText: {
      fontSize: 16, color: 'grey', fontWeight: 'bold'
   },
   categoryTextSelected: {
      color: Colors.dark,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: Colors.dark,
   },
});


export default DetailsScreen;