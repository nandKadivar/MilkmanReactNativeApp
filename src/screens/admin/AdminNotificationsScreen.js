import React,{useState,useEffect} from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground, FlatList} from 'react-native';
import firebase from '@firebase/app'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../../components/DairyShopData'
import { useSelector, useDispatch } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { getUserDetails, getSubscriptionRequests } from '../../actions/userActions'
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdminNotificationsScreen = ({navigation}) => {
    // const x = props.route.params.x
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetails)
    const { subscriptionRequestsLoading,subscriptionRequests } = useSelector(state => state.subscriptionRequests)
    console.log(subscriptionRequests)
    useEffect(() => {
        dispatch(getUserDetails())
        dispatch(getSubscriptionRequests())
    }, [dispatch])

    const acceptReqHandler = async (item) => {
        await firebase.firestore().collection('subscriptions').doc(item.docId).update({
            isConfirm: true
        })

        navigation.navigate('Customers')
    }

    const deleteReqHandler = async (item) => {
        
    }

    const notificationCard = ({ item }) => {
        return (
            <View style={styles.notificationCard}>
                <View style={styles.row}>
                    <Text style={styles.notificationCardText}>Name: </Text>
                    <Text style={styles.notificationCardSubtext}>{ item.customerName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.notificationCardText}>Email: </Text>
                    <Text style={styles.notificationCardSubtext}>{ item.customerEmail}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.notificationCardText}>Starting date: </Text>
                    <Text style={styles.notificationCardSubtext}>{ item.startingDate}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.notificationCardText}>Schedule: </Text>
                    <Text style={styles.notificationCardSubtext}>{ item.scheduleType}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.notificationCardText}>Instruction: </Text>
                    <Text style={styles.notificationCardSubtext}>{ item.instruction}</Text>
                </View>
                {
                    item.scheduleType == 'daily' || item.scheduleType == 'alternate' ? (
                        <View style={styles.row}>
                            <Text style={styles.notificationCardText}>Qty: </Text>
                            <Text style={styles.notificationCardSubtext}>{ item.qty} liters</Text>
                        </View>
                    ) : (
                            null
                    )
                }
                {
                    item.scheduleType == 'custom' && (
                        <View style={{flexDirection: 'row',width: '100%',marginVertical: 8,alignItems: 'center',justifyContent: 'space-around',}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>M: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.mon}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>T: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.tue}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>W: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.wen}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>T: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.thu}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>F: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.fri}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>S: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.sat}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.notificationCardText}>S: </Text>
                                <Text style={styles.notificationCardSubtext}>{item.qty.sun}</Text>
                            </View>
                        </View>
                    )
                }
                <View style={styles.mapContainer}>
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                        loadingEnabled={true}
                        customMapStyle={mapStyle}
                        region={
                            {
                                latitude: item.subscriberAddress.latitude,
                                longitude: item.subscriberAddress.longitude,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.025
                            }
                        }
                    >   
                        <MapView.Marker
                                image={require('../../../assets/images/map_marker.png')}
                                coordinate={item.subscriberAddress}
                            >
                                <Callout tooltip>
                                    <View>
                                        <View style={styles.tooltip}>
                                            <Text>House No. </Text>
                                            {
                                                item.houseNo == '' ? (
                                                    <Text>NA</Text>
                                                ): (
                                                    <Text>{ item.houseNo }</Text>
                                                )
                                            }
                                        </View>
                                        <View style={styles.arrowBorder}></View>
                                        <View style={styles.arrow}></View>
                                    </View>
                                </Callout>
                        </MapView.Marker>
                    </MapView>
                </View>
                <View style={styles.notificationCardFooter}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => acceptReqHandler(item)}><Text style={styles.acceptButtonText}>Accept</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteReqHandler(item)}><FontAwesome name="trash" color={primaryColor} size={24} /></TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('AdminHomepage')}>
                    <FontAwesome name='chevron-left' color={primaryColor} size={24} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <ScrollView>
                    {
                        subscriptionRequestsLoading == false && (
                            <FlatList
                                data={subscriptionRequests}
                                renderItem={notificationCard}
                                keyExtractor={item => item.id}
                            />
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default AdminNotificationsScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#c9e7f2',
      backgroundColor: '#f7f7f7',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
        alignItems: 'center',
        paddingVertical: 15,
    },
    notificationCard: {
        width: windowWidth / 1.05,
        padding: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    notificationCardText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    notificationCardSubtext: {
        fontSize: 16
    },
    mapContainer: {
        marginTop: 5,
        width: '100%',
        height: windowHeight / 3,
    },
    notificationCardFooter: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    acceptButton: {
        marginTop: 10,
        width: '80%',
        height: windowHeight/16,
        borderRadius: 5,
        backgroundColor: primaryColor,
        // borderWidth: 2,
        // borderColor: primaryColor,
        justifyContent: 'center'
    },
    acceptButtonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    deleteButton: {
        marginTop: 10,
        width: '15%',
        height: windowHeight/16,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tooltip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    }
});