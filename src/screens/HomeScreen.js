import React,{useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import ProfileScreen from './ProfileScreen'
// import NotificationsScreen from './'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '@firebase/app'
import { useSelector, useDispatch } from 'react-redux'
import { listShops } from '../actions/shopActions'
import { getUserDetails } from '../actions/userActions'
import ExploreLogo from '../../assets/logo/ExploreLogo'
import {primaryColor} from '../theme'
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

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const { shops } = useSelector(state => state.shopDetails)
    const { user } = useSelector(state => state.userDetails)

    var count = 0
  
    useEffect(() => {
      dispatch(listShops())
      dispatch(getUserDetails())
    }, [dispatch])
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name='bars' size={24} />
          </TouchableOpacity>
        </View>
          {
            shops !== undefined ? (
              user ? (
                shops.map((x) => (
                  x.cunstomer && (
                    x.cunstomer.map((item) => {
                      if (item.email === user.email && item.isConfirm === true) {
                        count += 1
                        return (
                          <View style={styles.mainContainer}>
                            <Text>{x.name}</Text>
                          </View>
                        )
                      }
                    })
                  )  
                ))
              ) : (
                <View style={styles.mainContainer}>
                  <Text>User not found</Text>    
                  {console.log('User not found')}
                </View>
              )
            ) : (
              <View style={styles.mainContainer}>
                <Text>Shop not found</Text>
                {console.log('Shop not found')}
              </View>
            )
        }
        {
          count === 0 && (
            <View style={styles.mainContainer}>
              <ExploreLogo />
              <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('Explore')}>
                <Text style={styles.btnText}><FontAwesome name='' />Explore Suppliers</Text>
              </TouchableOpacity>    
            </View>
          )
        }
      </View>
    )
}
  
const Notifications = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
      </View>
    );
}
  
const CustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userDetails)
  
  useEffect(() => {
    dispatch(getUserDetails())
  }, [dispatch])
  // console.log(user)

  return (
      <View flex={1}>
        <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
          <View style={styles.mainContent}>
            <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={{ color: '#fff', fontSize: 24, textTransform: 'uppercase' }}>{String(user.name)[0]}</Text>
            </View>
              <Text style={{ fontSize: 22, marginTop: 5 }}>{ user.name }</Text>
              <Text style={{ fontSize: 12, marginTop: 2, color: '#9D9D9D' }}>{ user.email }</Text>
            </View>
          </View>
          <DrawerItem
            label="Profile"
            icon={({ color }) => (<FontAwesome name="user" color={color} size={22} />)}
            // onPress={}
          />
          <DrawerItem
            label="Notifications"
            icon={({ color }) => (<FontAwesome name="bell" color={color} size={20} />)}
            // onPress={}
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
  
const MyDrawer = () => {
    return (
      <drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <drawer.Screen name="Homepage" component={Home} label="Home" />
        <drawer.Screen name="Profile" component={ProfileScreen} />
        {/* <Drawer.Screen name="Feed" component={Feed} /> */}
        <drawer.Screen name="Notifications" component={Notifications} />
      </drawer.Navigator>
    );
  }
  
const HomeScreen = ({ navigation }) => {
    return (
        <MyDrawer />
    )
}

export default HomeScreen

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
  userInfo: {
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