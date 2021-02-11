import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions,ImageBackground, ScrollView} from 'react-native';
import * as Location from 'expo-location'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../components/DairyShopData'
import Rating from '../components/Rating'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import InputField from '../components/InputField'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../actions/index'
import { getDistance } from 'geolib';
import { primaryColor } from '../theme'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ExploreScreen = ({navigation}) => {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.userState)

    useEffect(() => {
        dispatch(fetchUser())
        getUserLocation()
    }, [dispatch])
    
    const searchHandler = () => {
        
    }

    const viewDetailsHandler = () => {
        
    }

    const getUserLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        } else {
            const {coords} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
            setLocation(coords)
            console.log(JSON.stringify(coords))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFillObject}
                loadingEnabled={true}
                customMapStyle={mapStyle}
                region={region}
            >
                {   location !== null ?
                    markers.map(x => {
                        let distance = getDistance(x.coordinates,
                            { latitude: location.latitude, longitude: location.longitude }
                        );
                        if (distance <= 5000) {
                            return(
                                <MapView.Marker
                                    key={x.id}
                                    coordinate={ x.coordinates }
                                    image={require('../../assets/images/map_marker.png')}
                                >
                                    <Callout tooltip>
                                        <View>
                                            <View style={styles.tooltip}>
                                                <Text style={styles.name}>{ x.title}</Text>
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
            {/* <View style={styles.searchbarContainer}>
                <InputField icon="location-arrow" iconSize="24" onChangeText={searchHandler} placeholder="Enter your city name" />
            </View> */}
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollview}
            >
                {/* <TouchableOpacity> */}
                {
                    location !== null ?
                        markers.map((x) => {
                            let distance = getDistance(x.coordinates,
                                { latitude: location.latitude, longitude: location.longitude }
                            );
                            if (distance <= 5000) {
                                return (
                                    <View style={styles.cardContainer} key={x.id}>
                                        <View style={styles.cardImageContainer}>
                                            <Image style={styles.cardImage} resizeMode='cover' source={require('../../assets/images/dairyshop.jpg')} />
                                        </View>
                                        <View style={styles.cardTitleContainer}>
                                            <Text numberOfLines={1} style={styles.cardTitle}>{x.title}</Text>
                                            <Rating value="4.5" color={primaryColor} text="(45)" />
                                        </View>
                                        <View style={styles.cardDescriptionContainer}>
                                            <Text style={styles.cardDescription}>{x.description}</Text>
                                        </View>
                                        <View style={styles.cardFooterContainer}>
                                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}><FontAwesome name='rupee-sign' size={24} /> 45 <Text style={{ fontSize: 12, fontWeight: 'normal' }}>/liter</Text></Text>
                                            <TouchableOpacity style={styles.button} onPress={viewDetailsHandler}><Text style={styles.buttonText}>View Details</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        })
                        :
                        (null)
                    }
                {/* </TouchableOpacity> */}
            </ScrollView>
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
    scrollview: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    cardContainer: {
        backgroundColor: '#fff',
        // marginTop: height/1.41,
        elevation: 1.5,
        borderRadius: 5,
        marginHorizontal: 10,
        height: height / 3.5,
        width: width / 1.1,
        overflow: 'hidden'
    },
    cardImageContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: '#000'
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
    cardFooterContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
  });