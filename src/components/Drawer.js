import React from 'react'
import {Dimensions} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../screens/ProfileScreen'

const Drawer = createDrawerNavigator()

export default createAppContainer(Drawer)