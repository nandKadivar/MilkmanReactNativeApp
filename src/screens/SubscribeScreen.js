import React,{useState,useEffect} from 'react'
import {SafeAreaView} from 'react-navigation'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { theme } from '../theme'
var primaryColor = theme.primaryColor
import * as Location from 'expo-location'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DatePicker from 'react-native-datepicker'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
import { useFonts } from 'expo-font';

const SubscribeScreen = (props) => {
    const x = props.route.params.x

    var currentDate = new Date().getDate()
    var currentMonth = new Date().getMonth() + 1
    var currentYear = new Date().getFullYear()
    var minDay = currentDate + 1
    var maxMonth = currentMonth + 1
    var minDate = String(minDay+'-'+currentMonth+'-'+currentYear)
    var maxDate = String(currentDate + '-' + maxMonth + '-' + currentYear)
    
    const [date,setDate] = useState(minDate)
    const [qty, setQty] = useState(1)
    const [instruction, setInstruction] = useState('')
    const [schedule, setSchedule] = useState('daily')
    const [monQty, setMonQty] = useState(1)
    const [tueQty, setTueQty] = useState(1)
    const [wenQty, setWenQty] = useState(1)
    const [thuQty, setThuQty] = useState(1)
    const [friQty, setFriQty] = useState(1)
    const [satQty, setSatQty] = useState(1)
    const [sunQty, setSunQty] = useState(1)
    
    var total = monQty+tueQty+wenQty+thuQty+friQty+satQty+sunQty
   
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.userDetails)
    // console.log(x)
    useEffect(() => {
        dispatch(getUserDetails())
        getUserLocation()
    }, [])
    
    let [fontsLoaded] = useFonts({
        'Impact': require('../../assets/fonts/impact.ttf'),
    });

    const sendRequestHandler = () => {
        if (user) {
            if (schedule == 'daily') {
                var deliverySchedule = 'daily'
            }
            // else if (schedule == 'alternate') {
            //     var day = new Date(date).getDay()
                
            //     console.log(date)
            // }
            else {
                var deliverySchedule = 'custom'
            }
            var data = {
                shopDetails: x,
                customerDetails: user,
                subscriberDetails: {
                    startingDate: date,
                    instruction: instruction,
                    schedule: deliverySchedule,
                    qty: qty,
                    mon: monQty,
                    tue: tueQty,
                    wen: wenQty,
                    thu: thuQty,
                    fri: friQty,
                    sat: satQty,
                    sun: sunQty
                },
            }
            props.navigation.navigate('address',{data})
        } else {
            console.log("Un able to get user's details")
        }
        // if (user) {
        //     try {
        //         console.log(x.id)
        //         await firebase.firestore().collection('users').doc(x.id).update({
        //             // cunstomer: [
        //             //     {
        //             //         email: user.email,
        //             //         name: user.name,
        //             //         qty: qty,
        //             //         address: {
        //             //             latitude: address.latitude,
        //             //             longitude: address.longitude
        //             //         },
        //             //         isConfirm: false
        //             //     }
        //             // ]
        //             cunstomer: firebase.firestore.FieldValue.arrayUnion({
        //                 email: user.email,
        //                 name: user.name,
        //                 qty: qty,
        //                 address: {
        //                     latitude: address.latitude,
        //                     longitude: address.longitude
        //                 },
        //                 isConfirm: false
        //             })
        //             // price: 1
        //         })
        //         // const message= {flag: true}
        //         props.navigation.navigate('Explore')
        //         // props.navigation.navigate('Explore')
        //     } catch (error) {
        //         console.log(error)
        //         console.log("Fail to send subscription request .........")
        //         // const message= {flag: false}
        //         props.navigation.navigate('Explore')
        //     }
        // }
    }


    const getUserLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        } else {
            const {coords} = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
            setLocation(coords)
            setAddress({latitude: coords.latitude,longitude: coords.longitude})
            // console.log(JSON.stringify(coords))
        }
    }

    const plusQtyHandler = () => {
        setQty(qty+1)
    }

    const minusQtyHandler = () => {
        if (qty >= 2) {
            setQty(qty-1)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color: '#fff', fontSize: 24 }}>{ x.name }</Text>
                <Text style={{ color: '#ececec', fontSize: 16 }}>{x.description}</Text>
                <View style={{ width: windowWidth / 1.05, flexDirection: 'row',marginTop: 25}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}><MaterialCommunityIcons color='#fff' name='currency-inr' size={18} />{x.price} <Text style={{ fontSize: 12, fontWeight: 'normal' }}>/liter</Text></Text>
                </View>
            </View>
            
            <View style={styles.dairyDetailsContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>Select Starting date: </Text>
                    <DatePicker
                        style={styles.datePicker}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD-MM-YYYY"
                        minDate={minDate}
                        maxDate={maxDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconComponent={<FontAwesome name="calendar" style={{position: 'absolute',left:20}} size={20} color={primaryColor} />}
                        customStyles={{
                            dateInput: {
                                marginLeft: 27,
                                borderWidth: 0
                            },
                            dateTouchBody: {
                                backgroundColor: '#ececec',
                                borderRadius: 5,
                            },
                        }}
                        onDateChange={(date) => {setDate(date)}}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Instruction:</Text>
                    <TextInput style={{width: 200,height: 40,backgroundColor: '#ececec',borderRadius: 7,paddingVertical:2,paddingHorizontal: 15}} onChangeText={(value)=>setInstruction(value)} />
                </View>
                <View style={styles.scheduleRow}>
                    <Text style={styles.text}>Schedule:</Text>
                    <View style={{paddingVertical: 10,width: '100%',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
                        <TouchableOpacity
                            style={schedule == 'daily' ? styles.scheduleSelectorSelected : styles.scheduleSelector}
                            onPress={()=>setSchedule('daily')}
                        >
                            <Text style={schedule == 'daily' ? styles.scheduleSelectorSelectedText : styles.scheduleSelectorText}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={schedule == 'alternate' ? styles.scheduleSelectorSelected : styles.scheduleSelector}
                            onPress={()=>setSchedule('alternate')}
                        >
                            <Text style={schedule == 'alternate' ? styles.scheduleSelectorSelectedText : styles.scheduleSelectorText}>Alternate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={schedule == 'custom' ? styles.scheduleSelectorSelected : styles.scheduleSelector}
                            onPress={()=>setSchedule('custom')}
                        >
                            <Text style={schedule == 'custom' ? styles.scheduleSelectorSelectedText : styles.scheduleSelectorText}>custom</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={schedule == 'custom' ? styles.weekSelector : styles.hide}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setMonQty(monQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>M</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (monQty >= 1 && total>4) {
                                        setMonQty(monQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ monQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setTueQty(tueQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>T</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (tueQty >= 1 && total>4) {
                                        setTueQty(tueQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ tueQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setWenQty(wenQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>W</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (wenQty >= 1 && total>4) {
                                        setWenQty(wenQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ wenQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setThuQty(thuQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>T</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (thuQty >= 1 && total>4) {
                                        setThuQty(thuQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ thuQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setFriQty(friQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>F</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (friQty >= 1 && total>4) {
                                        setFriQty(friQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ friQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setSatQty(satQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>S</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (satQty >= 1 && total>4) {
                                        setSatQty(satQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ satQty }</Text>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    setSunQty(sunQty+1);
                                }}
                            >
                                <FontAwesome name='plus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: primaryColor,paddingHorizontal: 7,paddingVertical: 3,borderRadius: 50}}>
                                <Text style={{color: '#fff',fontSize: 18}}>S</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.plus2}
                                onPress={() => {
                                    if (sunQty >= 1 && total>4) {
                                        setSunQty(sunQty-1)
                                    }
                                }}
                            >
                                <FontAwesome name='minus' color={primaryColor} size={18} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{ sunQty }</Text>
                        </View>
                    </View>
                </View>
                <View style={schedule == 'custom' ? styles.lastrow : styles.hide}>
                    <Text style={styles.text}>Total per week: </Text>
                    <Text style={styles.text}>{ total } liters</Text>
                </View>
                <View style={schedule == 'custom' ? styles.hide : styles.row}>
                    <Text style={styles.text}>Set qty in liter:</Text>
                    {/* <Text style={styles.text}>{x.price}/<Text style={{fontSize: 12}}>liter</Text></Text> */}
                    <View style={styles.qtyContainer}>
                        <TouchableOpacity style={styles.plus} onPress={minusQtyHandler}><FontAwesome name='minus' color={'#f7f7f7'} size={18} /></TouchableOpacity>
                            <Text style={styles.qtyText}>{ qty.toFixed(0) }</Text>
                        <TouchableOpacity style={styles.plus} onPress={plusQtyHandler}><FontAwesome name='plus' color={'#f7f7f7'} size={18} /></TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <View style={styles.btnContainer}> */}
                <TouchableOpacity style={schedule == 'custom' ? styles.button : styles.button} onPress={sendRequestHandler}><Text style={styles.buttonText}>Select Address</Text></TouchableOpacity>
            {/* </View> */}
        </View>
    )
}

export default SubscribeScreen

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
    dairyDetailsContainer: {
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
    scheduleRow: {
        flexDirection: 'column',
        width: windowWidth/1.05,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2'
    },
    scheduleSelector: {
        backgroundColor: '#e2e2e2',
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scheduleSelectorText: {
        color: '#000'
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
    weekSelector: {
        paddingVertical: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    hide: {
        display: 'none'
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
    }
});