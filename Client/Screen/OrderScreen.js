import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
const OrderScreen = () => {
    return (
        <View style={styles.container}>
            <Text>OrderScreen</Text>
        </View>
    );
}

 
export default OrderScreen;