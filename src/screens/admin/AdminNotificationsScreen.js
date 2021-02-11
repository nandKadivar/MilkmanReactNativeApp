import React from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground} from 'react-native';

const AdminNotificationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Admin notifications Screen</Text>
            {/* <Map /> */}
        </View>
    )
}

export default AdminNotificationsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});