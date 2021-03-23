import React,{useState,useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import AdminProfileScreen from './AdminProfileScreen'
import AdminNotificationsScreen from './AdminNotificationsScreen'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '@firebase/app'
import { useSelector, useDispatch } from 'react-redux'
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { getUserDetails, changeAppTheme, getSubscriptions } from '../../actions/userActions'
import {getTodaysSchedule} from '../../actions/shopActions'
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
  const { subscriptionsLoading, subscriptions } = useSelector(state => state.subscriptions)
  const { scheduleDetailsLoading, scheduleDetails } = useSelector(state => state.schedule)
  const [milkContainerQty,setMilkContainerQty] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubscriptions())
    dispatch(getTodaysSchedule())
  }, [dispatch])
  // console.log(scheduleDetails)

  // var currentDate = new Date().getDate()
  // var currentMonth = new Date().getMonth() + 1
  // if (String(currentMonth).length <= 1) {
  //   currentMonth = '0'+currentMonth
  // }
  // var currentYear = new Date().getFullYear()
  // var todaysDate = String(currentDate + '-' + currentMonth + '-' + currentYear)
  // console.log(todaysDate)
  // const [today,setToday] = useState(todaysDate)
  // const [schedule,setSchedule] = useState([])
  // var scheduleDetails = []
  
  if (scheduleDetailsLoading === false) {
    if (scheduleDetails.length > 0) {
      const data = scheduleDetails
      var total = 0
      // console.log(data)
      data.forEach((item) => {
        if (item.qty) {
          // setMilkContainerQty(milkContainerQty + item.qty)
          // console.log(item.qty)
          total = total + item.qty
        }
      })
      // setMilkContainerQty(10)
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FontAwesome name='bars' size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.section1}>
              <View style={styles.totalQtyContainer}>  
                  <Text>{ total }</Text>
              </View>
              <View style={styles.scheduleCard}>
                <Text></Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
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
              <Text style={styles.btnText}><FontAwesome name='' />No schedule Today</Text>
            {/* </TouchableOpacity> */}
          </View>
        </View>
      );
    }
  } else {
    return (
      <View style={styles.mainContainer}>
        <Text>Loading ...</Text>
      </View>
    )
  }
}
  
const AdminCustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userDetails)
  
  useEffect(() => {
    dispatch(getSubscriptions())
    dispatch(getUserDetails())
  },[dispatch])
  
  return (
      <View flex={1}>
        <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
          <View style={styles.mainContent}>
            <View style={styles.adminInfo}>
              <View style={styles.avatar}><Text style={{ color: '#fff', fontSize: 24, textTransform: 'uppercase' }}>{user.name[0]}</Text></View>
              <Text style={{ fontSize: 22, marginTop: 5 }}>{ user.name }</Text>
              <Text style={{ fontSize: 12, marginTop: 2, color: '#9D9D9D' }}>{ user.email }</Text>
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
            onPress={() => props.navigation.navigate('AdminNotifications',{user})}
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
    height: '95%',
    justifyContent: 'flex-start',
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
  section1: {
    width: windowWidth,
    height: windowHeight / 3,
    backgroundColor: primaryColor,
    flexDirection: 'column',
    alignItems: 'center',
  },
  totalQtyContainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: windowWidth / 2.5,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  scheduleCard: {
    position: 'absolute',
    top: windowHeight/4.8,
    width: windowWidth / 1.1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'column'
  }
});