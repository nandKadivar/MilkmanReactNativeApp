import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, Dimensions,TextInput, TouchableOpacity  } from 'react-native';
import { theme } from '../theme'
var primaryColor = theme.primaryColor
import * as Location from 'expo-location'
import firebase from 'firebase'
import MapView from 'react-native-maps'
import { mapStyle } from '../components/DairyShopData'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const AddressScreen = (props) => {
    const data = props.route.params.data

    const [address,setAddress] = useState(null)
    const [location, setLocation] = useState(null)
    const [houseNumber,setHouseNumber] = useState('')
    // console.log(data)
    // console.log(address)

    useEffect(() => {
        getUserLocation()
    }, [])

    const getUserLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        } else {
            const {coords} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
            setLocation(coords)
            setAddress({latitude: coords.latitude,longitude: coords.longitude})
        }
    }

    const sendRequestHandler = async () => {
        // console.log(data)
        if (data.subscriberDetails.schedule === 'daily') {
            await firebase.firestore().collection('subscriptions').add({
                cunstomerId: firebase.auth().currentUser.uid,
                shopId: data.shopDetails.id,
                scheduleType: 'daily',
                qty: data.subscriberDetails.qty,
                instruction: data.subscriberDetails.instruction,
                startingDate: data.subscriberDetails.startingDate,
                price: data.shopDetails.price,
                houseNo: houseNumber,
                subscriberAddress: {
                    latitude: address.latitude,
                    longitude: address.longitude
                },
                isConfirm: false
            }).then((snapshot) => {
                console.log(snapshot.id)
                // await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                //     subcription: firebase.firestore.FieldValue.arrayUnion({
                                    
                //     })
                // })
            });
            const message = {
                name: data.shopDetails.name 
            }
            props.navigation.navigate('Homepage',{message})
        } else {
            await firebase.firestore().collection('subscriptions').add({
                cunstomerId: firebase.auth().currentUser.uid,
                shopId: data.shopDetails.id,
                scheduleType: 'custom',
                qty: {
                    mon: data.subscriberDetails.mon,
                    tue: data.subscriberDetails.tue,
                    wen: data.subscriberDetails.wen,
                    thu: data.subscriberDetails.thu,
                    fri: data.subscriberDetails.fri,
                    sat: data.subscriberDetails.sat,
                    sun: data.subscriberDetails.sun,
                },
                instruction: data.subscriberDetails.instruction,
                startingDate: data.subscriberDetails.startingDate,
                price: data.shopDetails.price,
                houseNo: houseNumber,
                subscriberAddress: {
                    latitude: address.latitude,
                    longitude: address.longitude
                },
                isConfirm: false
            }).then((snapshot) => {
                console.log(snapshot.id)
            });
            const message = {
                name: data.shopDetails.name 
            }
            
            props.navigation.navigate('Homepage',{message})
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
                    }}
                >
                </MapView>
            }
            <Image style={{position: 'absolute', top: windowHeight/2.1,width: 40,height:40}} source={require('../../assets/images/map_marker.png')} />

            <View style={styles.footerContainer}>
                <View style={{flexDirection: 'row',width: windowWidth/1.05,alignItems: 'center',justifyContent: 'space-between',padding:0,paddingVertical: 20}}>
                    <Text style={styles.text}>House/Flat No :</Text>
                    <TextInput style={{width: 200,height: 40,backgroundColor: '#ececec',borderRadius: 7,paddingVertical:2,paddingHorizontal: 15}} onChangeText={(value)=>setHouseNumber(value)} placeholder="221 B" />
                </View>
                <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={sendRequestHandler}><Text style={styles.buttonText}>Select Address</Text></TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerContainer: {
        width: windowWidth,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    text: {
        padding: 5,
        fontSize: 16
    },
    button: {
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
    },
});
  
