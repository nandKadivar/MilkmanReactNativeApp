import React from 'react'
import {StyleSheet,View, Text} from 'react-native'

const CustomerDetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Customer details</Text>
        </View>
    )
}

export default CustomerDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
