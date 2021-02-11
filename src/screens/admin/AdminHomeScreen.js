import React,{useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import AdminProfileScreen from './AdminProfileScreen'
import AdminNotificationsScreen from './AdminNotificationsScreen'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '@firebase/app'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../actions/index'
// import ExploreLogo from '../../../assets/logo/ExploreLogo'
import {primaryColor} from '../../theme'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const logoutHandler = async ({ navigation }) => {
  await firebase.auth().signOut()
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
}

const AdminHome = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name='bars' size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          {/* <ExploreLogo /> */}
          {/* <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('Explore')}> */}
            <Text style={styles.btnText}><FontAwesome name='' />Hello Admin user</Text>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    );
  }
  
const AdminCustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.userState)
  
  useEffect(() => {
    dispatch(fetchUser())
  },[dispatch])
  
  return (
      <View flex={1}>
        <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
          <View style={styles.mainContent}>
            <View style={styles.adminInfo}>
              <View style={styles.avatar}><Text style={{ color: '#fff', fontSize: 24, textTransform: 'uppercase' }}>{currentUser.name[0]}</Text></View>
              <Text style={{ fontSize: 22, marginTop: 5 }}>{ currentUser.name }</Text>
              <Text style={{ fontSize: 12, marginTop: 2, color: '#9D9D9D' }}>{ currentUser.email }</Text>
            </View>
          </View>
          <DrawerItem
            label="Profile"
            icon={({ color }) => (<FontAwesome name="user" color={color} size={22} />)}
            onPress={() => props.navigation.navigate('AdminProfile')}
          />
          <DrawerItem
            label="Notifications"
            icon={({ color }) => (<FontAwesome name="bell" color={color} size={20} />)}
            onPress={() => props.navigation.navigate('AdminNotifications')}
          />
        {/* <DrawerItem label="Close drawer" onPress={() => props.navigation.closeDrawer()} /> */}
          <DrawerItem
            label="Logout"
            icon={({ color }) => (<FontAwesome name="sign-out" color={color} size={22} />)}
            onPress={logoutHandler}
          />
        </DrawerContentScrollView>
        
        {/* <Drawer.Section style={styles.logoutSection}> */}
        {/* </Drawer.Section> */}
      </View>
    );
}
  
const drawer = createDrawerNavigator();
  
const AdminDrawer = () => {
    return (
      <drawer.Navigator drawerContent={props => <AdminCustomDrawerContent {...props} />}>
        <drawer.Screen name="AdminHomepage" component={AdminHome} label="AdminHome" />
        <drawer.Screen name="AdminProfile" component={AdminProfileScreen} />
        <drawer.Screen name="AdminNotifications" component={AdminNotificationsScreen} />
      </drawer.Navigator>
    );
  }
  
const AdminHomeScreen = ({ navigation }) => {
    return (
        <AdminDrawer />
    )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
      padding: 15,
      paddingLeft: 25,
      width: windowWidth,
      elevation: 1,
      backgroundColor: '#fff'
  },
  mainContainer: {
    width: windowWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: primaryColor,
    height: windowHeight/16,
    width: windowWidth / 1.85,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 15,
    textTransform: 'uppercase',
    color: primaryColor,
    fontWeight: 'bold'
  },
  adminInfo: {
    marginTop: 10,
    marginLeft: 15,
  },
  avatar: {
    backgroundColor: primaryColor,
    width: 48,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

});