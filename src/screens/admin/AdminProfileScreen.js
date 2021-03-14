import React from 'react'
import {SafeAreaView} from 'react-navigation'
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground} from 'react-native';

const AdminProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Admin profile Screen</Text>
            {/* <Map /> */}
        </View>
    )
}

export default AdminProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});