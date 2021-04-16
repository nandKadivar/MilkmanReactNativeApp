import React,{useState,useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions,Image } from 'react-native'
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
import { getTodaysSchedule } from '../../actions/shopActions'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../../components/DairyShopData'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEY } from '../../../googleMapsApiKey'

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
  const { user } = useSelector(state => state.userDetails)
  const [milkContainerQty, setMilkContainerQty] = useState(0)
  const [distance, setDistance] = useState('NA')
  const [duration, setDuration] = useState('NA')
  // const [mapView,setMapView] = useState(null)
  // const [waypoints,setWaypoints] = useState([])
  const dispatch = useDispatch()
  // const [total,setTotal] = useState(0)

  useEffect(() => {
    dispatch(getUserDetails())
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

      var waypointslength = scheduleDetails.length
      var waypoints = []

      for (var i = 0; i < waypointslength; i++){
        waypoints.push(scheduleDetails[i].address)
      }
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
                <Text style={{ fontSize: 28 }}>{total} <Text style={{fontSize: 20}}>liters</Text></Text>
              </View>
              {/* {console.log(scheduleDetails)} */}
              <View style={styles.scheduleCard}>
                {/* <Text>
                  {console.log(scheduleDetails)}
                </Text> */}
                {
                  scheduleDetails.map((item, key) => {
                    if (item.qty > 0) {
                      // setTotal(total+item.qty)
                      return (
                        <View style={styles.row}>
                          {/* { item.customerName} */}
                          <Text>{item.customerName}</Text>
                          <Text>{item.qty}</Text>
                          {/* <TouchableOpacity style={styles.btnContainer}><Text style={styles.btnText}>Mark as done</Text></TouchableOpacity> */}
                        </View>
                      )
                    }
                  })
                }
                <View style={styles.row}>
                  <Text>Route distance: </Text>
                  <Text>{distance} km</Text>
                </View>
                <View style={styles.row}>
                  <Text>Trip duration: </Text>
                  <Text>{duration} minute</Text>
                </View>
              </View>
            </View>
                
            <View style={styles.mapContainer}>
              <MapView
                style={StyleSheet.absoluteFillObject}
                loadingEnabled={true}
                customMapStyle={mapStyle}
                region={region}
                // ref={c => setMapView(c)}
              >
                {
                  scheduleDetails.map((item, key) => {
                    // waypoints.push(item.address)
                    return (
                      <MapView.Marker
                        key={item.customerEmail}
                        coordinate={{ latitude: item.address.latitude, longitude: item.address.longitude }}
                        image={require('../../../assets/images/map_marker.png')}
                      >
                        <Callout tooltip>
                          <View>
                            <View style={styles.tooltip}>
                              <Text style={styles.name}>{item.customerName}</Text>
                              <Text style={styles.description}>: {item.customerEmail}</Text>
                              {/* <Image style={styles.tooltipImage} source={require('../../../assets/images/dairyshop.jpg')} /> */}
                            </View>
                            <View style={styles.arrowBorder}></View>
                            <View style={styles.arrow}></View>
                          </View>
                        </Callout>
                      </MapView.Marker>
                    )
                  })
                }
                {/* {console.log(waypoints)} */}
                <MapViewDirections
                  origin={{
                    latitude: user.address.latitude,
                    longitude: user.address.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.00221
                  }}
                  waypoints={waypoints}
                  optimizeWaypoints={true}
                  destination={{
                    latitude: user.address.latitude,
                    longitude: user.address.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}
                  strokeWidth={5}
                  strokeColor={primaryColor}
                  apikey={GOOGLE_MAPS_API_KEY}
                  onReady={(result) => {
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                    setDistance(result.distance)
                    setDuration(result.duration)
                  }}
                >
                </MapViewDirections>
                
              </MapView>
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
    // marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: primaryColor,
    height: windowHeight/25,
    width: windowWidth / 2.5,
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
    alignItems: 'center'
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
    padding: 20,
    flexDirection: 'column',
    elevation: 5
    // zIndex: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mapContainer: {
    width: windowWidth,
    height: windowHeight - (windowHeight / 3),
    zIndex: -10
  },
  tooltip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#000',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
  }
});