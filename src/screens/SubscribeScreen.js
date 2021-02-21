import React,{useState,useEffect} from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { primaryColor } from '../theme'
import * as Location from 'expo-location'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import firebase from 'firebase'
import MapView, { Callout } from 'react-native-maps'
import { region, mapStyle } from '../components/DairyShopData'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
// import { getDistance } from 'geolib';
// import Rating from '../components/Rating'
// import InputField from '../components/InputField'

const SubscribeScreen = (props) => {
    const x = props.route.params.x
    const [address,setAddress] = useState(null)
    const [location, setLocation] = useState(null)

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetails)
    
    useEffect(() => {
        dispatch(getUserDetails())
        getUserLocation()
    },[])

    const sendRequestHandler = async() => {
        if (user) {
            // console.log(user.uid)
            try {
                console.log(x.email)
                await firebase.firestore().collection('users').where('email','==',x.email).update({
                    cunstomer: [
                        {
                            email: user.email,
                            name: user.name,
                            qty: 2,
                            address: {
                                latitude: address.latitude,
                                longitude: address.longitude
                            },
                            isConfirm: false
                        }
                    ]
                })
            } catch (error) {
                console.log(error)
                console.log("Fail to send subscription request .........")
            }
        }
    }


    const getUserLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        } else {
            const {coords} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
            setLocation(coords)
            // console.log(JSON.stringify(coords))
        }
    }

    return (
        <View style={styles.container}>
            {
                location && 
                <MapView
                    style={StyleSheet.absoluteFillObject}
                    loadingEnabled={true}
                    customMapStyle={mapStyle}
                    initialRegion={{ 
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.025
                    }}
                    onRegionChange={(region) => {
                        setAddress(region)
                        console.log(location)
                    }}
                >   
                    {/* <MapView.Marker
                        // key={index}
                        coordinate={region}
                        // title={marker.title}
                        // description={marker.description}
                    /> */}
                </MapView>
            }
            <Image style={{position: 'absolute', top: windowHeight/2.1,width: 40,height:40}} source={require('../../assets/images/map_marker.png')} />

            <View style={styles.dairyDetailsContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>Dairy name:</Text>
                    <Text style={styles.text}>{x.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Price:</Text>
                    <Text style={styles.text}>{x.price}/<Text style={{fontSize: 12}}>liter</Text></Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={sendRequestHandler}><Text style={styles.buttonText}>Subscribe Supplier</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default SubscribeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mainContainer: {
        width: windowWidth / 1.1,
        height: windowHeight / 1.1,
        borderRadius: 7,
        backgroundColor: '#fff'
    },
    dairyDetailsContainer: {
        backgroundColor: '#fff',
        // marginVertical: 10,
        width: windowWidth,
        padding: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: windowWidth / 1.3,
        marginVertical: 15
    },
    row: {
        flexDirection: 'row',
        width: windowWidth/1.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#e2e2e2',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    text: {
        padding: 5,
        fontSize: 16
    },
    subscriptionFormContainer: {
        backgroundColor: '#fff',
        marginVertical: 10,
        width: windowWidth / 1.1,
        padding: 10
    },
    mapContainer: {
        width: '100%',
        height: 400
    },
    button: {
        marginTop: 10,
        width: windowWidth/1.05,
        height: windowHeight/16,
        borderRadius: 5,
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
    }
});