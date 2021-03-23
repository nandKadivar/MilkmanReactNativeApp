import { LIST_SHOPS_REQUESTED,LIST_SHOPS_SUCCESS, LIST_TODAYSSCHEDULE_REQUESTED, LIST_TODAYSSCHEDULE_SUCCESS } from '../constants/index'
import firebase from 'firebase'

export const listShops = () => async (dispatch) => {
    try {
        dispatch({
            type: LIST_SHOPS_REQUESTED
        })

        let shops = []
        // await firebase.firestore().collection('users').where('isShopOwner', '==', true).get().then((snapshot) => {
            await firebase.firestore().collection('dairyOwners').get().then((snapshot) => {
            // console.log(snapshot)
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    // console.log(doc.data())
                    var data = {...doc.data(),"id": doc.id}
                    shops.push(data)
                    // console.log(shops)
                });
            } else {
                console.log('Errrroooor')
            }
        });
        // console.log(shops)
        dispatch({
            type: LIST_SHOPS_SUCCESS,
            payload: shops
        })

    } catch (error) {
        console.log(error)        
    }
}

export const getTodaysSchedule = () => async (dispatch) => {
    dispatch({
        type: LIST_TODAYSSCHEDULE_REQUESTED
    })
    
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "sun";
    weekday[1] = "mon";
    weekday[2] = "tue";
    weekday[3] = "wen";
    weekday[4] = "thu";
    weekday[5] = "fri";
    weekday[6] = "sat";
    var dayOfWeek = weekday[d.getDay()]
    var currentUserId = firebase.auth().currentUser.uid
    var scheduleDetails = []
    var currentDate = d.getDate()
    var currentMonth = d.getMonth() + 1
    if (String(currentMonth).length <= 1) {
        currentMonth = '0'+currentMonth
    }
    var currentYear = d.getFullYear()
    var todaysDate = String(currentDate + '-' + currentMonth + '-' + currentYear)
    await firebase.firestore().collection('subscriptions').where('shopId', '==', currentUserId).get().then(async (snapshot) => {
        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                var docdata = { ...doc.data(), "docId": doc.id }
                var data = {
                    customerId: docdata.customerId,
                    customerName: docdata.customerName,
                    customerEmial: docdata.customerEmail,
                    // qty: docdata.qty,
                    address: docdata.subscriberAddress
                }
                if (docdata.isConfirm == true) {
                    var splitSatringDate = docdata.startingDate.split('-')
                    var splitEndingDate = docdata.endingDate.split('-')
                    var splitTodaysDate = todaysDate.split('-')
                    if (splitSatringDate[2] <= splitTodaysDate[2]) {
                        if (splitSatringDate[1] <= splitTodaysDate[1]) {
                            if (splitSatringDate[0] <= splitTodaysDate[0]) {
                                if (docdata.scheduleType == 'daily') {
                                    data = {
                                        customerId: docdata.customerId,
                                        customerName: docdata.customerName,
                                        customerEmial: docdata.customerEmail,
                                        qty: docdata.qty,
                                        address: docdata.subscriberAddress
                                    }
                                } else {
                                    data = {
                                        customerId: docdata.customerId,
                                        customerName: docdata.customerName,
                                        customerEmial: docdata.customerEmail,
                                        qty: docdata.qty[dayOfWeek],
                                        address: docdata.subscriberAddress
                                    }
                                }      
                            }
                        }
                    }
                }
                scheduleDetails.push(data)
            });
        } else {
            console.log('Error while fetching schedule info')
        }
        dispatch({
            type: LIST_TODAYSSCHEDULE_SUCCESS,
            payload: scheduleDetails
        })
    })
}