import React from 'react'
import {StyleSheet ,View, Text} from 'react-native'

const PaymentScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Payment Screen</Text>
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});