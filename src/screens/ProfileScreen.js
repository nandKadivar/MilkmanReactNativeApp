import React from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { theme } from '../theme'
var primaryColor = theme.primaryColor
// import Map from '../components/Map'

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            {/* <Map /> */}
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});