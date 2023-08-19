import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Image,
  Button,
  ScrollView,
  Pressable,
  FlatList,
  RefreshControl,
  SafeAreaViewBase,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

import Colors from '../src/themes/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CartScreen = ({navigation, route}) => {
  const IPv4 = '192.168.1.18';
  const [cart, setCart] = useState([]);
  var data = cart;
  console.log(data[0]);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    getData();
  }, []);

  //get data from asyncStorage
  const getData = async () => {
    AsyncStorage.getItem('cart')
      .then(cart => {
        if (cart !== null) {
          // We have data!!
          const datacart = JSON.parse(cart);
          setCart(datacart);
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  const onChangeQuantity = (i, type) => {
    const dataCar = cart.slice();
    let quant = dataCar[i].soLuong;
    console.log(dataCar);
    if (type) {
      quant = quant + 1;
      dataCar[i].soLuong = quant;
      setCart(dataCar);
    } else if (type == false && quant >= 2) {
      quant = quant - 1;
      dataCar[i].soLuong = quant;
      setCart(dataCar);
    } else if (type == false && quant == 1) {
      dataCar.splice(i, 1);
      setCart(dataCar);
    }
  };
  const xoaGioHang = () => {
    try {
      AsyncStorage.removeItem('cart');
      console.log('Đã xóa giỏ hàng.');
    } catch (e) {
      // remove error
      console.log(e);
    }
  };
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cart');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }
        await AsyncStorage.setItem('cart', JSON.stringify(array));
      }
    }
  };
  const priceXquantity = () => {
    var total = 0;
    const carts = cart;
    for (var i = 0; i < carts.length; i++) {
      total = total + carts[i].giaTien * carts[i].soLuong;
    }
    return total;
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Icon
          name="arrow-back"
          size={28}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Icon name="delete" size={28} onPress={() => xoaGioHang()} />
      </View>

      <ScrollView>
        {data.map((item, index) => {
          return (
            <SafeAreaView style={style.card}>
              <View style={{flexDirection: 'row', margin: 5}} key={index}>
                {/* Image */}
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Colors.white_smoke,
                    marginLeft: 15,
                    borderRadius: 5,
                    borderWidth: 0.2,
                  }}>
                  <Image
                    source={{
                      uri:
                        'http://192.168.1.18:5000/uploads/images/' +
                        item.url_Image,
                    }}
                    resizeMode="contain"
                    style={{
                      height: 100,
                      width: 100,
                    }}
                  />
                </View>
                {/* Content       */}
                <View style={style.cardContent}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Colors.dark,
                      fontWeight: 'bold',
                    }}>
                    {item.sp}
                  </Text>

                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: Dimensions.get('screen').width / 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        // color: Colors.dark,
                        fontWeight: 'normal',
                      }}>
                      Size: {item.size}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        // color: Colors.dark,
                        fontWeight: 'normal',
                      }}>
                      {item.giaTien.toLocaleString() + 'đ'}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => onChangeQuantity(index, false)}>
                      <Text>-</Text>
                    </TouchableOpacity>

                    <Text
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        fontWeight: 'bold',
                      }}>
                      {item.soLuong}
                    </Text>

                    <TouchableOpacity
                      onPress={() => onChangeQuantity(index, true)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    Tạm tính: {(item.soLuong * item.giaTien).toLocaleString()}đ
                  </Text>
                </View>
              </View>
            </SafeAreaView>
          );
        })}
      </ScrollView>
      {/* footer */}
      <View style={style.totalSection}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
          }}>
          <Text style={style.title}>Tổng:</Text>

          <Text style={style.textBold}>{(priceXquantity() + 30000).toLocaleString()}đ</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 15,
          }}>
          {/* Phí sp */}
          <Text style={style.subTitle}>Phí sản phẩm</Text>
          <View style={style.divider} />
          <Text style={style.text}>{priceXquantity().toLocaleString()}đ</Text>
        </View>
        {/* row1 */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <Text style={style.subTitle}>Phí vận chuyển</Text>
          <View style={style.divider} />
          <Text style={style.text}>30.000đ</Text>
        </View>
        {/* coupon */}
        <View style={style.couponSection}>
          <TextInput
            style={style.placeholder}
            placeholder="Enter Voucher Code"
          />
          <Text style={style.subTitle}>ÁP DỤNG</Text>
        </View>
        <Button title="Mua Hàng" style={style.buttons} color="green" />
      </View>
    </View>
  );
};

export default CartScreen;

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: '100%',
  },
  card: {
    flex: 1,
    marginTop: 15,
  },
  cardContent: {
    marginLeft: 12,
  },
  totalSection: {
    borderTopWidth: 0.7,
    borderLeftWidth: 0.7,
    borderRightWidth: 0.7,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: '30%',
    padding: 15,
  },
  divider: {
    height: 1,
    borderColor: '#dddddd',
    borderWidth: 0.2,
    flex: 1,
    marginHorizontal: 15,
    marginTop: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.dark,
    textTransform: 'uppercase',
  },
  subTitle: {
    size: 14,
    color: Colors.dark,
  },
  text: {
    color: Colors.dark,
    size: 14,
  },
  textBold: {
    color: Colors.dark,
    size: 14,
    fontWeight: 'bold',
  },
  couponSection: {
    height: 40,
    borderRadius: 50,
    borderColor: 'rgba(0,0,0,0.15)',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 32,
    marginTop: 11,
    marginBottom: 11,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  placeholder: {
    opacity: 0.6,
    color: '#707070',
    fontFamily: '',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  buttons: {
    paddingHorizontal: 10,
    color: Colors.green,
  },
});
