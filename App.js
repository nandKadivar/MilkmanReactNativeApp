import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import {firebaseConfig} from './config'
import { enableScreens} from 'react-native-screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Provider } from 'react-redux'
import store from './src/store'
import LottieView from 'lottie-react-native';
// YellowBox ignoreWarnings(['Warning: ...']);

const Stack = createNativeStackNavigator()
enableScreens();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


import OnboardingScreen from './src/screens/OnboardingScreen'
import LandingScreen from './src/screens/LandingScreen'
import SignupScreen from './src/screens/SignupScreen'
import LoginScreen from './src/screens/LoginScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import Main from './src/screens/Main'
import SubscribeScreen from './src/screens/SubscribeScreen'
import AddressScreen from './src/screens/AddressScreen'
import CustomerDetailsScreen from './src/screens/admin/CustomerDetailsScreen'


export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunch').then(value => {
      console.log(value)
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunch', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true)
        setLoggedIn(false)
      } else {
        setLoaded(true)
        setLoggedIn(true)
      }
    })
  }, [])
  
  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading ...</Text>
         {/* <LottieView style={{width: 400,height: 400}} source={require('./assets/33371-milk-splash.json')} autoplay loop /> */}
       </View>
    )
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {
            isFirstLaunch ? (
              <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
            ) : (null)
          }
          <Stack.Screen name="Landing" options={{ headerShown: false }} component={LandingScreen} />
          <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Main" options={{ headerShown: false }} component={Main} />
          <Stack.Screen name="Subscribe" options={{ headerShown: false }} component={SubscribeScreen} />
          <Stack.Screen name="address" options={{ headerShown: false }} component={AddressScreen} />
          <Stack.Screen name="customerDetails" options={{ headerShown: false }} component={CustomerDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
