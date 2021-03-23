import React from 'react'
import { StyleSheet, View, Text, Button, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from '../theme'
var primaryColor = theme.primaryColor
const windowWidth = Dimensions.get('window').width;

const LandingScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Welcome,</Text>
                </View>
                {/* <View style={styles.subtextContainer}>
                    <Text style={styles.subtitle}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium veritatis temporibus magni maiores, ipsum fugiat, quaerat, soluta corporis commodi quas eum. Voluptate nam, voluptates vitae unde odit magnam accusamus saepe.</Text>
                </View> */}
                <View style={styles.subtextContainer}>
                    <Text style={styles.subtitle}>Mikman helps you to connect with world. Now finding the reliable milk supplier is become easy. If you are running dairy business and want to reach to your customers? Milkman has the solution. Lets change the old way of doing business by connection togather and achive the true meaning of 'Local for Vocal'</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}><Text style={styles.loginButtonText}>Log in</Text></TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}><Text style={styles.signupButtonText}>Sign up</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: primaryColor,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    textContainer: {
        // backgroundColor: '#fff',
        marginBottom: 25,
    },
    subtextContainer: {
        // backgroundColor: '#fff',
        textAlign: 'justify',
        width: windowWidth - 75,
        marginBottom: 100,
    },
    title: {
        color: '#fff',
        fontSize: 36,
    },
    subtitle: {
        color: '#f7f7f7',
        fontSize: 16,
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        backgroundColor: '#fff',
        width: windowWidth - 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    loginButtonText: {
        color: primaryColor,
        fontSize: 16,
    },
    signupButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        width: windowWidth - 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
    }
  });
  