import React,{useEffect} from 'react'
import {View,Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import HomeScreen from './HomeScreen'
import ExploreScreen from './ExploreScreen'
import PaymentScreen from './PaymentScreen'
import AdminHomeScreen from './admin/AdminHomeScreen'
import AdminCustomersSceen from './admin/AdminCustomersScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from '../theme'
var primaryColor = theme.primaryColor
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import firebase from 'firebase'

const Tab = createBottomTabNavigator();

const registerForNotifications = async () => {
    const status = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status
  
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
  
    if (finalStatus != 'granted') {
      return
    }
  
    let token = (await Notifications.getExpoPushTokenAsync()).data
    // return token
    var currentUserId = firebase.auth().currentUser.uid
    await firebase.firestore().collection('users').doc(currentUserId).update({
        expoPushToken: token
    })
    // await firebase.firestore().collection('dairyOwners').doc(currentUserId).update({
    //     expoPushToken: token
    // })
  }

const Main = () => {

    // const dispatch = useDispatch()
    // const { currentUser } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.userDetails)
    var token = ''

    useEffect(() => {
        dispatch(getUserDetails())
        registerForNotifications()
    }, [dispatch])
    
    if (user == undefined) {
        // console.log(user)
        return (
            <View></View>
        )
    }
    else if (user.isShopOwner === true) {
        return (
            <Tab.Navigator tabBarOptions={{activeTintColor: primaryColor, inactiveTintColor: 'gray'}}>
                <Tab.Screen name="Home" component={AdminHomeScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={26}/>)}} />
                <Tab.Screen name="Customers" component={ AdminCustomersSceen } options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="user" color={color} size={26}/>)}} />
                {/* <Tab.Screen name="" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="credit-card" color={color} size={26}/>)}} /> */}
            </Tab.Navigator>
        )
    } else if (user.isShopOwner === undefined || user.isShopOwner === false) {
        return (
            <Tab.Navigator tabBarOptions={{activeTintColor: primaryColor, inactiveTintColor: 'gray'}}>
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={26}/>)}} />
                <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="wpexplorer" color={color} size={26}/>)}} />
                <Tab.Screen name="Payment" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="credit-card" color={color} size={26}/>)}} />
            </Tab.Navigator>
        )
    }else{
        return (
            <View></View>
        )
    }
}

export default Main