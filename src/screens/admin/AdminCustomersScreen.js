import React from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground} from 'react-native';

const AdminCustomersScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Admin Customer Screen</Text>
        </View>
    )
}

export default AdminCustomersScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});