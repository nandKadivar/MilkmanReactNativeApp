import React,{useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import InputField from '../components/InputField'
import ForgotPasswordLogo from '../../assets/logo/ForgotPasswordLogo'
import { theme } from '../theme'
var primaryColor = theme.primaryColor
import firebase from '@firebase/app'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ForgotPasswordScreen = ({ navigation }) => {
    const [email,setEmail] = useState('')
    const [error, setError] = useState(null)
    
    const emailChangeHandler = (value) => {
        setEmail(value)
    }

    const forgotPasswordHandler = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email)
            navigation.replace('Login')
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    return (
        <View style={styles.mainContainer}>
            {/* <View cstyle={styles.header}><FontAwesome name="arrow-left" color={'#000'} size={ 24}/></View> */}
            <ForgotPasswordLogo style={{marginTop: 60}} />
            <Text style={styles.title}>Not An Issue!</Text>
            <View style={styles.inputContainer}>
                <InputField icon="envelope" placeholder='Email' onChangeText={emailChangeHandler} />
                <Text></Text>
            </View>
            {
                error && (
                    <View style={styles.errorLabel}>
                        <Text style={styles.errorLabelText}>{ error }</Text>
                    </View>
                )
            }
            <TouchableOpacity style={styles.button} onPress={ forgotPasswordHandler }><Text style={styles.buttonText}><FontAwesome name="paper-plane" color={'#fff'} style={{transform: [{rotateY: '90deg'}]}} size={20} /> Send Email</Text></TouchableOpacity>
        </View>
    )
}

export default ForgotPasswordScreen

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
        // borderWidth: 2,
        // borderColor: primaryColor,
        backgroundColor: primaryColor,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    header: {
        alignItems: 'flex-start'
    },
    errorLabel: {
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 5,
        width: windowWidth / 1.2,
        height: windowHeight / 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7D7DA'
    },
    errorLabelText: {
        color: '#814147'
    }
});