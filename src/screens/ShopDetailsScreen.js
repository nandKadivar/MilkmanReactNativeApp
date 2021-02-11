import React from 'react'
import {StyleSheet ,View, Text} from 'react-native'

const ShopDetailsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Shop Details Screen</Text>
        </View>
    )
}

export default ShopDetailsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});