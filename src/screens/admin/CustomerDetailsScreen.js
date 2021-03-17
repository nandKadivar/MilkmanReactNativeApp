import React from 'react'
import {StyleSheet,View, Text, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MapView, { Callout } from 'react-native-maps'
import { region, markers, mapStyle } from '../../components/DairyShopData'
import { theme } from '../../theme'
var primaryColor = theme.primaryColor
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const CustomerDetailsScreen = (props) => {
    const item = props.route.params.item
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: '#fff', fontSize: 24 }}>{ item.customerName }</Text>
                <Text style={{ color: '#ececec', fontSize: 16 }}>{item.customerEmail}</Text>
            </View>
            
            <View style={styles.customerDetailsContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>Starting date: </Text>
                    <Text style={styles.text}>{ item.startingDate }</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Instruction:</Text>
                    <Text style={styles.text}>{ item.instruction }</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Schedule:</Text>
                    <Text style={styles.text}>{ item.scheduleType }</Text>
                </View>
                <View style={item.scheduleType == 'custom' ? styles.weekRow : styles.hide}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>M:</Text>
                        <Text style={styles.text}>{ item.qty.mon }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>T:</Text>
                        <Text style={styles.text}>{ item.qty.tue }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>W:</Text>
                        <Text style={styles.text}>{ item.qty.wen }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>T:</Text>
                        <Text style={styles.text}>{ item.qty.thu }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>F:</Text>
                        <Text style={styles.text}>{ item.qty.fri }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>S:</Text>
                        <Text style={styles.text}>{ item.qty.sat }</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>S:</Text>
                        <Text style={styles.text}>{ item.qty.sun }</Text>
                    </View>
                </View>
                {/* <View style={item.scheduleType == 'custom' ? styles.lastrow : styles.hide}>
                    <Text style={styles.text}>Total per week: </Text>
                    <Text style={styles.text}>{ total } liters</Text>
                </View> */}
                <View style={item.scheduleType == 'custom' ? styles.hide : styles.row}>
                    <Text style={styles.text}>Qty</Text>
                    {/* <Text style={styles.text}>{x.price}/<Text style={{fontSize: 12}}>liter</Text></Text> */}
                    {/* <View style={styles.qtyContainer}> */}
                    {
                        item.scheduleType != 'custom' && (
                            <Text style={styles.text}>{item.qty} liters</Text>
                        ) 
                    }
                    {/* </View> */}
                </View>
                <View style={styles.row}>
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
                </View>
            </View>
        </View>
    )
}

export default CustomerDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        width: windowWidth,
        height: 200,
        paddingVertical: 20,
        paddingHorizontal: 20,
        // borderRadius: 7,
        backgroundColor: primaryColor,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    customerContainer: {
        backgroundColor: '#fff',
        // marginVertical: 10,
        width: windowWidth,
        padding: 10,
        paddingBottom: 20,
        // marginTop: 10,
        // position: 'absolute',
        // bottom: 0,
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
    lastrow: {
        flexDirection: 'row',
        width: windowWidth/1.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#e2e2e2',
        // borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    weekRow: {
        flexDirection: 'row',
        width: windowWidth/1.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    scheduleRow: {
        flexDirection: 'row',
        width: windowWidth/1.05,
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    scheduleSelectorSelected: {
        backgroundColor: primaryColor,
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scheduleSelectorSelectedText: {
        color: '#fff'
    },
    hide: {
        display: 'none'
    },
    text: {
        padding: 5,
        fontSize: 16
    },
    mapContainer: {
        width: '100%',
        height: 400
    },
    qtyContainer: {
        width: '40%',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    plus: {
        backgroundColor: primaryColor,
        borderRadius: 5,
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8
    },
    plus2: {
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5,
        marginVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8
    },
    qtyText: {
        fontSize: 26,
        color: primaryColor
        // paddingHorizontal: 10
    },
    // btnContainer: {
    //     // position: 'absolute',
    //     // bottom: 0,
    //     padding: 20,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    button: {
        // marginTop: 10,
        // position: 'absolute',
        // bottom: 0,
        width: windowWidth/1.05,
        height: windowHeight/16,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: primaryColor,
        justifyContent: 'center',
        marginTop: -3
    },
    // bottomButton: {
    //     width: windowWidth/1.05,
    //     height: windowHeight/16,
    //     borderRadius: 5,
    //     borderWidth: 2,
    //     borderColor: primaryColor,
    //     justifyContent: 'center',
    //     marginTop: 150
    // },
    buttonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: primaryColor,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    datePicker: {
        borderWidth: 0
    },
    mapContainer: {
        marginTop: 5,
        width: '100%',
        height: windowHeight / 3,
    },
    tooltip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    }
})
