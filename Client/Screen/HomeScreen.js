
import React, { useState, useEffect } from 'react';
import {
   View,
   Text,
   ScrollView,
   SafeAreaView,
   Image,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   Dimensions,
} from 'react-native';

import Colors from '../src/themes/Color';
import ipv4 from '../src/config/ipConfig'

import axios from 'axios';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
const width = Dimensions.get('screen').width / 2 - 30;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
   const categories = ["POPULAR", "ORGANIC", "INDOORS", "SYNTHETIC"];
   const [categoryIndex, setcategoryIndex] = useState(0);

   const [productList, setProductList] = useState();

   const getAllProducts = (() => {
      axios.get("http://" + ipv4 + ":5000/api/products")
         .then(response =>
            // console.log("response", response.data),
            setProductList(response.data)
         )
   })
   useEffect(() => {
      getAllProducts();
   }, [])

   const CategoryList = () => {
      return (
         <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
               <TouchableOpacity key={index}
                  activeOpacity={0.8}
                  onPress={() => setcategoryIndex(index)}>
                  <Text style={[styles.categoryText, categoryIndex == index && styles.categoryTextSelected]}>{item}</Text>
               </TouchableOpacity>

            ))}
         </View>
      );
   };

   // Item 
   const Card = ({ item, index }) => {
      return (
         <TouchableOpacity
            onPress={() => navigation.navigate('DetailsScreen', { id: item._id })}>
            <View style={styles.card}>
               <View style={{ alignItems: "flex-end" }}>
                  <View
                     style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: item.like
                        //    ? 'rgba(245, 42, 42, 0.2)'
                        // : 'rgba(0,0,0,0.2)',
                     }}>
                     {/* <Icon
                        name="favorite"
                        size={18}
                        color={item.like ? Colors.red : Colors.dark}
                     /> */}
                  </View>
               </View>

               <View style={{ height: 100, alignItems: 'center' }}>
                  <Image
                     style={{ flex: 1, width: 100, height: 100, resizeMode: 'contain' }}
                     source={{ uri: "http://" + ipv4 + ':5000/uploads/images/' + item.img }} />
               </View>
               <Text style={{ fontSize: 15, marginTop: 10, color: Colors.dark }}>
                  {item.title}
               </Text>
               <View
                  style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     marginTop: 5,
                  }}>
                  <Text style={{ fontSize: 14, color: Colors.dark }}>{item.price.toLocaleString()} đ</Text>
                  <View
                     style={{
                        height: 25,
                        width: 25,
                        backgroundColor: Colors.green,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}>
                     <Text style={{ fontSize: 18, color: Colors.white, fontWeight: 'bold' }}>
                        +
                     </Text>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      )
   }
   return (
      <View
         style={{ flex: 1, paddingHorizontal: 20, backgroundColor: Colors.white }}>
         <View style={styles.header}>
            <View>
               <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Welcome to</Text>
               <Text style={{ fontSize: 38, color: Colors.green, fontWeight: 'bold' }}>
                  Fashions Shop
               </Text>
            </View>
            <Icon name="shopping-cart" size={28} onPress={()=>navigation.navigate('CartScreen')}/>
         </View>
         <View style={{ marginTop: 30, flexDirection: 'row' }}>
            <View style={styles.searchContainer}>
               <Icon name="search" size={25} color={Colors.dark} style={{ marginLeft: 20 }} />
               <TextInput placeholder="Search" style={styles.input} />
            </View>
            <View style={styles.sortBtn}>
               <Icon name="sort" size={30} color={Colors.white} />
            </View>
         </View>
         <CategoryList />
         <FlatList
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
               marginTop: 10,
               paddingBottom: 50,
            }}
            numColumns={2}
            data={productList}
            renderItem={({ item }) => {
               return <Card item={item} />;
            }}
         />
      </View>
   );
};
function ProfileScreen() {
   return <View />;
}

function SettingsScreen() {
   return <View />;
}
const styles = StyleSheet.create({
   categoryContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
   },
   categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
   categoryTextSelected: {
      color: Colors.green,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: Colors.green,
   },
   card: {
      height: 225,
      backgroundColor: Colors.light,
      width,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
   },
   header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   searchContainer: {
      height: 50,
      backgroundColor: Colors.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
   },
   input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: Colors.dark,
   },
   sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: Colors.green,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default HomeScreen;