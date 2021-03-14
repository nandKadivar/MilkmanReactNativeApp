import React,{useEffect} from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions,ImageBackground} from 'react-native';
import firebase from '@firebase/app'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../../components/DairyShopData'
import { useSelector, useDispatch } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
import { getUserDetails } from '../../actions/userActions'
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdminNotificationsScreen = ({navigation}) => {
    // const x = props.route.params.x
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetails)
  
    useEffect(() => {
        dispatch(getUserDetails())
    }, [dispatch])
    
    const acceptReqHandler = async (item) => {
        // firebase.firestore().doc(firebase.auth().currentUser.uid).update()
        // const firestore = firebase.firestore()
        // const col = firestore.collection('users')
        // const query = col.where('cunstomer', 'array-contains-any', 'item.email')
        // query.get().then(snapshot => {
        //     snapshot.docs.forEach(doc => {
        //         console.log(doc.id,doc.data())
        //     })
        // })

        var currentUserId = firebase.auth().currentUser.uid
        // firebase.firestore().doc(firebase.auth().currentUser.uid).update()
        // const firestore = firebase.firestore()
        // const col = firestore.collection('users')
        // const query = col.where('AhMaxiyWxQeOLVd7DgvOIUKNGCs1/cunstomer', 'array-contains-any', 'item.email')
        // query.get().then(snapshot => {
        //     snapshot.docs.forEach(doc => {
        //         console.log(doc.id,doc.data())
        //     })
        // })
        // await firebase.firestore().collection('users').doc(currentUserId).update({
        //     cunstomer: firebase.firestore.FieldValue.arrayRemove({
        //         email: user.email,
        //         name: user.name,
        //         qty: qty,
        //         address: {
        //             latitude: address.latitude,
        //             longitude: address.longitude
        //         },
        //         isConfirm: false
        //     })
        // })

        await firebase.firestore().collection('users').doc(currentUserId).update({
            cunstomer: [
                {
                    email: item.email,
                    name: item.name,
                    qty: item.qty,
                    address: {
                        latitude: item.address.latitude,
                        longitude: item.address.longitude
                    },
                    isConfirm: true
                }
            ]
        });

        navigation.navigate('Customers')
    }

    const deleteReqHandler = async (item) => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
            cunstomer: []
        })
        // console.log(item.email)
        // const snapshot = await firebase.firestore().collection('users').where('email', '==', item.email).get().then((snapshot) => {
        //     console.log(snapshot.id())
        // })
        // var userId
        // await firebase.firestore().collection('users').where('email', '==', item.email).get().then((snapshot) => {
        //     snapshot.forEach((doc) => {
        //         userId = doc.id
        //     })
        // })

        // await firebase.firestore().collection('users').doc(userId).update({
        //     message: 'hiii'
        // })
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
                        user.cunstomer && (
                            user.cunstomer.map((item) => (
                                // <Text>{item.name}</Text>
                                item.isConfirm === false && (
                                    <View style={styles.notificationCard}>
                                        <View style={styles.row}>
                                            <Text style={styles.notificationCardText}>Name: </Text>
                                            <Text style={styles.notificationCardSubtext}>{item.name}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.notificationCardText}>Email: </Text>
                                            <Text style={styles.notificationCardSubtext}>{item.email}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={styles.notificationCardText}>Qty: </Text>
                                            <Text style={styles.notificationCardSubtext}>{item.qty} liter</Text>
                                        </View>
                                        <View style={styles.mapContainer}>
                                            <MapView
                                                style={StyleSheet.absoluteFillObject}
                                                loadingEnabled={true}
                                                customMapStyle={mapStyle}
                                                region={
                                                    {
                                                        latitude: item.address.latitude,
                                                        longitude: item.address.longitude,
                                                        latitudeDelta: 0.001,
                                                        longitudeDelta: 0.025
                                                    }
                                                }
                                            >   
                                                <MapView.Marker
                                                    image={require('../../../assets/images/map_marker.png')}
                                                    coordinate={item.address}
                                                />
                                            </MapView>
                                        </View>
                                        <View style={styles.notificationCardFooter}>
                                            <TouchableOpacity style={styles.acceptButton} onPress={() => acceptReqHandler(item)}><Text style={styles.acceptButtonText}>Accept</Text></TouchableOpacity>
                                            <TouchableOpacity style={styles.deleteButton} onPress={()=> deleteReqHandler(item)}><FontAwesome name="trash" color={primaryColor} size={24} /></TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            ))
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
        backgroundColor: '#fff',
        width: windowWidth / 1.1,
        padding: 15,
        marginVertical: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
    }
});