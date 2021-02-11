import React,{useEffect} from 'react'
import {View,Text} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/index'
import HomeScreen from './HomeScreen'
import ExploreScreen from './ExploreScreen'
import PaymentScreen from './PaymentScreen'
import AdminHomeScreen from './admin/AdminHomeScreen'
import AdminCustomersSceen from './admin/AdminCustomersScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {primaryColor} from '../theme'
const Tab = createBottomTabNavigator();

const Main = () => {

    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.userState)
    
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])
    
    if (currentUser == undefined) {
        return (
            <View></View>
        )
    }
    else if (currentUser.isShopOwner === true) {
        return (
            <Tab.Navigator tabBarOptions={{activeTintColor: primaryColor, inactiveTintColor: 'gray'}}>
                <Tab.Screen name="Home" component={AdminHomeScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={26}/>)}} />
                <Tab.Screen name="Customers" component={ AdminCustomersSceen } options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="user" color={color} size={26}/>)}} />
                {/* <Tab.Screen name="" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="credit-card" color={color} size={26}/>)}} /> */}
            </Tab.Navigator>
        )
    }
    return (
        <Tab.Navigator tabBarOptions={{activeTintColor: primaryColor, inactiveTintColor: 'gray'}}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="home" color={color} size={26}/>)}} />
            <Tab.Screen name="Explore" component={ExploreScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="wpexplorer" color={color} size={26}/>)}} />
            <Tab.Screen name="Payment" component={PaymentScreen} options={{ tabBarIcon: ({ color, size }) => (<FontAwesome name="credit-card" color={color} size={26}/>)}} />
        </Tab.Navigator>
    )
}

export default Main