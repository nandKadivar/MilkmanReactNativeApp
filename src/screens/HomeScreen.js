import React,{useState,useEffect} from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions,Picker } from 'react-native'
import { Text } from 'react-native-paper'
import ProfileScreen from './ProfileScreen'
// import NotificationsScreen from './'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from '@firebase/app'
import { useSelector, useDispatch } from 'react-redux'
import { listShops } from '../actions/shopActions'
import { getUserDetails, changeAppTheme } from '../actions/userActions'
import ExploreLogo from '../../assets/logo/ExploreLogo'
import LottieView from 'lottie-react-native';
import { theme } from '../theme'
var primaryColor = theme.primaryColor
import { LineChart } from 'react-native-chart-kit'
// import { Font } from 'expo'
import { useFonts } from 'expo-font';
import { Agenda, Calendar } from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { set } from 'react-native-reanimated';
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
    const { shops,shopsLoading } = useSelector(state => state.shopDetails)
    const { user, userLoading } = useSelector(state => state.userDetails)
    const { mode } = useSelector(state => state.DarkTheme)
    const [supplier, setSupplier] = useState(0)
    // console.log(loading)
    var count = 0
    console.log(mode)
    let [fontsLoaded] = useFonts({
      'Impact': require('../../assets/fonts/impact.ttf'),
    });
  
    useEffect(() => {
      dispatch(listShops())
      dispatch(getUserDetails())
    }, [dispatch])
  
  if (shopsLoading === false) {
    // console.log(shops)
    var suppliers = []

    shops.map((x,key) => (
      x.cunstomer && (
        x.cunstomer.map((item) => {
          if (item.email === user.email && item.isConfirm === true) {
            count += 1
            suppliers.push(x)
          }
        })
      )
    ))

    if (suppliers.length > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FontAwesome name='bars' size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.section1}>
              <View style={styles.supplierSelectContainer}>  
                <Picker style={{width: '100%'}} selectedValue={supplier} onValueChange={(itemValue,itemIndex) => {setSupplier(itemValue)}} >
                  {
                    suppliers.map((item,key)=> <Picker.Item label={item.name} value={key}  />)
                  }
                </Picker>
              </View>
              <View style={styles.statisticsCard}>
              {/* <Text style={fontsLoaded && {fontFamily: 'Impact',fontSize: 35,color: '#e0e0e0'}}>48</Text> */}
                {/* <Agenda
                  items={{
                    '2021-02-01': [{name: 'item 1 - any js object'}],
                    '2021-02-02': [{name: 'item 2 - any js object', height: 80}],
                    '2021-02-03': [],
                    '2021-02-04': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
                  }}
                /> */}
                <Calendar
                  style={{backgroundColor: '#fff',borderRadius: 5,elevation:1}}
                  markingType={'multi-dot'}
                  markedDates={{
                    '2021-03-01': {dots: [{key:'1', color: 'blue', selectedDotColor: 'blue'},{key:'2', color: 'blue', selectedDotColor: 'blue'}],marked: true}
                  }}
                />
                {/* <LineChart
                  data={{
                    labels: ['1', '2', '3', '4', '5', '6'],
                    datasets: [{
                      data: [
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10
                      ]
                    }]
                  }}
                  width={windowWidth / 1.1} height={200}
                  chartConfig={{
                    // backgroundColor: '#000',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0,89,212, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                /> */}
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return (  
        <View style={styles.Container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FontAwesome name='bars' size={24} />
            </TouchableOpacity>
          </View>
          <View style={{width: windowWidth,height: '95%',justifyContent: 'center',alignItems: 'center'}}>
            <ExploreLogo />
            <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.btnText}><FontAwesome name='' />Explore Suppliers</Text>
            </TouchableOpacity>    
          </View>
        </View>
      )
    }
  } else {
    return (
      <View style={styles.mainContainer}>
        <Text>Loading ...</Text>
      </View>
    )
  }
    
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
    height: '95%',
    // backgroundColor: '#fff',
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
  section1: {
    width: windowWidth,
    height: windowHeight / 3,
    backgroundColor: primaryColor,
    flexDirection: 'column',
    alignItems: 'center',
  },
  supplierSelectContainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: windowWidth / 1.5,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  statisticsCard: {
    position: 'absolute',
    top: windowHeight/4.8,
    width: windowWidth / 1.1,
    // height: 330,
    // elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column',

  }
});