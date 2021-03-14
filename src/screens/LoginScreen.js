import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated} from 'react-native';
import UserLogo from '../../assets/logo/UserLogo';
import firebase from '@firebase/app'
import InputField from '../components/InputField'
import { theme } from '../theme'
var primaryColor = theme.primaryColor

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(null)

    const emailChangeHandler = (value) => {
        setEmail(value)
    }
    const passwordChangeHandler = (value) => {
        setPassword(value)
    }
    
    const loginHandler = async ({navigation}) => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
                setError(error.message)
            })
    }
    
    return (
        <View style={styles.mainContainer}>
            <UserLogo style={{marginTop: 55}} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Signin to continue</Text>
            <View style={styles.inputContainer}>
                <InputField icon="envelope" placeholder='Email' onChangeText={emailChangeHandler} />
                <Text></Text>
            </View>
            <View style={styles.inputContainer}>
                <InputField icon="lock" secureTextEntry="true" placeholder='Password' onChangeText={passwordChangeHandler} />
                <Text></Text>
            </View>
            {
                error && (
                    <View style={styles.errorLabel}>
                        <Text style={styles.errorLabelText}>{ error }</Text>
                    </View>
                )
            }
            <View style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordLink} onPress={() => {navigation.navigate('ForgotPassword')}}>Forgot Password?</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={loginHandler}><Text style={styles.buttonText}>Log in</Text></TouchableOpacity>
            <View style={styles.linksContainer}>
                <Text style={{ color: '#000' }}>Don't have an account? <Text style={styles.links} onPress={()=>{navigation.replace('Signup')}} >create a new account</Text></Text>
            </View>
        </View>
    );
    
}

export default LoginScreen

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
        paddingTop: 20,
        fontSize: 28,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#9D9D9D',
        fontSize: 14,
        marginBottom: 28,
    },
    inputContainer: {
        width: windowWidth/1.2,
    },
    button: {
        marginTop: 10,
        width: windowWidth/1.2,
        height: windowHeight/16,
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
        color: primaryColor,
    },
    forgotPasswordContainer: {
        marginTop: 1,
        marginBottom: 6,
        alignItems: 'flex-end'
    },
    forgotPasswordLink: {
        // color: '#82c5ab'
        color: primaryColor
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