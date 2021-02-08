import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import RegisterLogo from '../../assets/logo/RegisterLogo';
import firebase from '@firebase/app'
import InputField from '../components/InputField'
import {primaryColor} from '../theme'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignupScreen = ({navigation}) => {
    const [name,setName] = useState('a')
    const [email,setEmail] = useState('a')
    const [password,setPassword] = useState('a')

    const nameChangeHandler = (value) => {
        setName(value)
    }
    const emailChangeHandler = (value) => {
        setEmail(value)
    }
    const passwordChangeHandler = (value) => {
        setPassword(value)
    }

    const signupHandler = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,email
                    })
                console.log(result)
            })
            .catch((err) => {
            console.log(err)
        })
        // console.log(name)
        // console.log(email)
        // console.log(password)
    }

    return (
        <View style={styles.mainContainer}>
            {/* <UserLogo /> */}
            <RegisterLogo style={{marginTop: 25}} />
            <Text style={styles.title}>Let's get started</Text>
            <View style={styles.inputContainer}>
                <InputField icon="user" placeholder='Name' onChangeText={nameChangeHandler} />
                <Text></Text>
            </View>
            <View style={styles.inputContainer}>
                <InputField icon="envelope" placeholder='Email' onChangeText={emailChangeHandler} />
                <Text></Text>
            </View>
            <View style={styles.inputContainer}>
                <InputField icon="lock" secureTextEntry="true" placeholder='Password' onChangeText={passwordChangeHandler} />
                <Text></Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={ signupHandler }><Text style={styles.buttonText}>Create Account</Text></TouchableOpacity>
            <View style={styles.linksContainer}>
                <Text style={{color: '#000'}}>Already have an account? <Text style={styles.links} onPress={() => navigation.replace('Login')}>Login</Text></Text>
            </View>
        </View>
    );
}

export default SignupScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        width: windowWidth,
        height: windowHeight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        color: '#3f3d56',
        paddingTop: 10,
        fontSize: 28,
        marginBottom: 25,
        fontWeight: 'bold'
    },
    inputContainer: {
        width: windowWidth/1.2,
    },
    button: {
        marginTop: 10,
        width: windowWidth - 60,
        height: 50,
        borderRadius: 5,
        // backgroundColor: '#2ba97a',
        // backgroundColor: '#0059D4',
        borderWidth: 2,
        borderColor: primaryColor,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: primaryColor,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    linksContainer: {
        marginTop: 15,
    },
    links: {
        // color: '#82c5ab'
        color: primaryColor
    }
  });