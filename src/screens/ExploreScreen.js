import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions,Animated, ScrollView} from 'react-native';
import * as Location from 'expo-location'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../components/DairyShopData'
import Rating from '../components/Rating'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import InputField from '../components/InputField'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails,getSubscriptionRequests,getSubscriptions } from '../actions/userActions'
import { listShops } from '../actions/shopActions'
import { getDistance } from 'geolib';
import { theme } from '../theme'
var primaryColor = theme.primaryColor

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ExploreScreen = ({navigation}) => {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)
    const [expanded, setExpanded] = useState(false)
    const dispatch = useDispatch()
    // const {currentUser} = useSelector(state => state.userState)
    const { shops, shopsLoading } = useSelector(state => state.shopDetails)
    const { user } = useSelector(state => state.userDetails)
    const { subscriptionRequestsLoading,subscriptionRequests } = useSelector(state => state.subscriptionRequests)
    const { subscriptionsLoading, subscriptions } = useSelector(state => state.subscriptions)

    var count = 0

    useEffect(() => {
        dispatch(listShops())
        dispatch(getSubscriptionRequests())
        dispatch(getSubscriptions())
        dispatch(getUserDetails())
        getUserLocation()
    }, [dispatch])
    
    // const searchHandler = () => {
        
    // }

    const viewDetailsHandler = () => {
        setExpanded(
            expanded ? false : true
        )
    }

    const onSubscribeHandler = (x) => {
        // console.log(x)
        navigation.navigate('Subscribe',{x})
    }

    const onCancelHandler = (x) => {

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
    // console.log(shops)

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                loadingEnabled={true}
                customMapStyle={mapStyle}
                region={region}
            >
                {   location !== null && !shopsLoading ?
                    shops.map(x => {
                        var distance = getDistance(
                            { latitude: x.address.latitude, longitude: x.address.longitude },
                            { latitude: location.latitude, longitude: location.longitude }
                        );
                        if (distance <= 5000) {
                        // console.log(x.address)
                            return(
                                <MapView.Marker
                                    key={x.email}
                                    coordinate={ { latitude: x.address.latitude, longitude: x.address.longitude } }
                                    image={require('../../assets/images/map_marker.png')}
                                >
                                    <Callout tooltip>
                                        <View>
                                            <View style={styles.tooltip}>
                                                <Text style={styles.name}>{ x.name}</Text>
                                                <Text style={styles.description}>{x.description}</Text>
                                                {/* <Image style={styles.tooltipImage} source={require('../../assets/images/dairyshop.jpg')} /> */}
                                            </View>
                                            <View style={styles.arrowBorder}></View>
                                            <View style={styles.arrow}></View>
                                        </View>
                                    </Callout>
                                </MapView.Marker>
                            )   
                        }
                    })
                    :
                    (null)
                }
            </MapView>
            <TouchableOpacity onPress={viewDetailsHandler} style={{
                position: 'absolute',
                bottom: expanded ? height/1.1 : height/3.2,
                paddingVertical: 5,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                borderRadius: 50,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2
            }}>
                <FontAwesome name={expanded ? 'angle-down' : 'angle-up'} color={primaryColor} size={26} />
            </TouchableOpacity>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                // pagingEnabled
                style={styles.scrollview}
            >
                {
                    location !== null && shops !== undefined ?
                    shops.map((x) => {
                        count = 0
                        let distance = getDistance(
                            { latitude: x.address.latitude, longitude: x.address.longitude },
                            { latitude: location.latitude, longitude: location.longitude }
                        );
                        if (distance <= 5000) {
                            return (
                                <View style={{backgroundColor: '#fff',elevation: 1.5,borderRadius: 5,marginHorizontal: 10,width: width / 1.08,height: expanded ? height / 1.13 : height / 3.5 ,overflow: 'hidden'}} key={x.email}>
                                    <View style={{width: '100%',height: expanded ? "30%" : '50%'}}>
                                        <Image style={styles.cardImage} resizeMode='cover' source={require('../../assets/images/dairyshop.jpg')} />
                                    </View>
                                    <View style={styles.cardTitleContainer}>
                                        <Text numberOfLines={1} style={styles.cardTitle}>{x.name}</Text>
                                        <Rating value={4.5} color={primaryColor} text="(45)" />
                                    </View>
                                    <View style={styles.cardDescriptionContainer}>
                                        <Text style={styles.cardDescription}>{x.description}</Text>
                                    </View>
                                    <View style={styles.cardFooterContainer}>
                                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}><MaterialCommunityIcons name='currency-inr' size={24} /> {x.price} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>/liter</Text></Text>
                                        {
                                            subscriptionsLoading == false && (
                                                subscriptions.length > 0 && (
                                                    subscriptions.map((a, key) => {
                                                        if (a.shopEmail == x.email) {
                                                            // console.log(x.email)
                                                            count = count +1
                                                            return (
                                                                <View style={styles.subscribed}><FontAwesome name='check' style={{ marginRight: 5 }} size={18} color={'#2d567f'} /><Text style={styles.subscribedText}>Subscribed</Text></View>
                                                            )
                                                        } else {
                                                            null
                                                        }
                                                    })
                                                )
                                            )
                                        }
                                        {
                                            subscriptionRequestsLoading == false && (
                                                subscriptionRequests.length > 0 && (
                                                    subscriptionRequests.map((a, key) => {
                                                        if (a.shopEmail == x.email) {
                                                            // console.log(x.email)
                                                            count = count +1
                                                            return (
                                                                <TouchableOpacity onPress={() => { onCancelHandler(x) }} style={styles.cancelButton}><Text style={styles.cancelButtonText}>Cancel Req...</Text></TouchableOpacity>
                                                            )
                                                        } else {
                                                            null
                                                        }
                                                    })
                                                )
                                            )
                                        }
                                        {
                                            count == 0 && (
                                                <TouchableOpacity onPress={() => onSubscribeHandler(x)} style={styles.button}><Text style={styles.buttonText}>Subscribe</Text></TouchableOpacity>
                                            )
                                        }
                                    </View>
                                </View>
                            )
                        }
                    })
                    :
                        (null)
                    }
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    searchbarContainer: {
        width: width / 1.1,
        position: 'absolute',
        top: 28,
    },
    toggleButton: {
        position: 'absolute',
        bottom: height / 3.1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    scrollview: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        // padding: 10
    },
    // cardContainer: {
    //     backgroundColor: '#fff',
    //     // marginTop: height/1.41,
    //     elevation: 1.5,
    //     borderRadius: 5,
    //     marginHorizontal: 10,
    //     height: cardHeight,
    //     width: width / 1.08,
    //     overflow: 'hidden'
    // },
    // cardContainer: {
    //     backgroundColor: '#fff',
    //     // marginTop: height/1.41,
    //     elevation: 1.5,
    //     borderRadius: 5,
    //     marginHorizontal: 10,
    //     height: height / 1.5,
    //     width: width / 1.1,
    //     overflow: 'hidden'
    // },
    cardImageContainer: {
        width: '100%',
        height: '50%',
    },
    cardImage: {
        // flex: 3,
        width: '100%',
        height: '100%',
        // alignItems: 'center'
    },
    cardTitleContainer: {
        // flex: 2,
        paddingTop: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardDescriptionContainer: {
        paddingHorizontal: 10,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    cardDescription: {
        fontSize: 12,
        color: '#9D9D9D'
    },
    button: {
        marginTop: 10,
        width: width/2.2,
        height: height/20,
        borderRadius: 5,
        // backgroundColor: '#2ba97a',
        backgroundColor: primaryColor,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cancelButton: {
        marginTop: 10,
        width: width/2.2,
        height: height/20,
        borderRadius: 5,
        // backgroundColor: '#2ba97a',
        borderWidth: 2,
        borderColor: primaryColor,
        // backgroundColor: primaryColor,
        justifyContent: 'center'
    },
    cancelButtonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: primaryColor,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subscribed: {
        marginTop: 10,
        width: width/2.2,
        height: height/20,
        borderRadius: 0,
        // backgroundColor: '#d4edda',
        backgroundColor: '#cbe5fe',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subscribedText: {
        fontSize: 15,
        textTransform: 'uppercase',
        // color: '#5f8d69',
        color: '#2d567f',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    cardFooterContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
  });