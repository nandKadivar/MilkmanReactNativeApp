import { USER_DETAILS_REQUESTED ,USER_DETAILS_SUCCESS, SEND_SUBSCRIPTIONREQUEST_SUCCESS, CHANGE_THEME,LIST_ADMINNOTIFICATIONS_REQUESTED,LIST_ADMINNOTIFICATIONS_SUCCESS,LIST_SUBSCRIPTIONS_REQUESTED,LIST_SUBSCRIPTIONS_SUCCESS} from '../constants/index'
import firebase from 'firebase'

export const getUserDetails = () => async(dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUESTED
        })

        await firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(async(snapshot) => {
            if (snapshot.exists) {
                // console.log(snapshot.data())
                dispatch({
                    type: USER_DETAILS_SUCCESS,
                    payload: snapshot.data()
                })
            } else {
                // console.log('User does not exist')
                await firebase.firestore()
                .collection("dairyOwners")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        // console.log(snapshot.data())
                        dispatch({
                            type: USER_DETAILS_SUCCESS,
                            payload: snapshot.data()
                        })
                    } else {
                        console.log('User does not exist')
                    }
                })
            }
        })

    } catch (error) {
        console.log(error)
    }   
}

export const sendSubscriptionRequest = () => async(dispatch) => {
    try {
        await firebase.firestore().collection('users').where('email', '==', 'kadivarnand007@gmail.com').update({
            cunstomer: [
                
            ]
        })
    } catch (error) {
        console.log(error)
        console.log("Fail to send subscription request .........")
    }
}

export const changeAppTheme = () => (dispatch) => {
    dispatch({
        type: CHANGE_THEME,
        payload: true
    })
}

export const getSubscriptionRequests = () => async(dispatch) => {
    try {
        dispatch({
            type: LIST_ADMINNOTIFICATIONS_REQUESTED
        })
        var currentUserId = firebase.auth().currentUser.uid
        var subscriptionRequests = []
        await firebase.firestore().collection('subscriptions').where('shopId', '==', currentUserId).get().then(async(snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    // console.log(doc.data())
                    var data = { ...doc.data(), "docId": doc.id }
                    // var customerData = firebase.firestore().collection('users').doc(data.cunstomerId).get()
                    if (data.isConfirm ==  false) {
                        subscriptionRequests.push(data)
                    }
                    // console.log(shops)
                });
                // console.log(subscription)
            } else {
                // console.log('Errrroooor')
                await firebase.firestore().collection('subscriptions').where('customerId', '==', currentUserId).get().then((snapshot) => {
                    if (!snapshot.empty) {
                        snapshot.forEach(doc => {
                            // console.log(doc.data())
                            var data = { ...doc.data(), "docId": doc.id }
                            // var customerData = firebase.firestore().collection('users').doc(data.cunstomerId).get()
                            if (data.isConfirm ==  false) {
                                subscriptionRequests.push(data)
                            }
                            // console.log(shops)
                        });
                        // console.log(subscription)
                    } else {
                        console.log('Errrroooor')
                    }
                })
            }
        })
        // console.log('Hiiiii')

        dispatch({
            type: LIST_ADMINNOTIFICATIONS_SUCCESS,
            payload: subscriptionRequests
        })

    } catch (error) {
        console.log(error)
    }   
}

export const getSubscriptions = () => async(dispatch) => {
    try {
        dispatch({
            type: LIST_SUBSCRIPTIONS_REQUESTED
        })
        var currentUserId = firebase.auth().currentUser.uid
        var subscriptions = []
        await firebase.firestore().collection('subscriptions').where('shopId', '==', currentUserId).get().then(async(snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    // console.log(doc.data())
                    var data = { ...doc.data(), "docId": doc.id }
                    // var customerData = firebase.firestore().collection('users').doc(data.cunstomerId).get()
                    if (data.isConfirm ==  true) {
                        subscriptions.push(data)
                    }
                    // console.log(shops)
                });
                // console.log(subscription)
            } else {
                // console.log('Errrroooor')
                await firebase.firestore().collection('subscriptions').where('customerId', '==', currentUserId).get().then((snapshot) => {
                    if (!snapshot.empty) {
                        snapshot.forEach(doc => {
                            // console.log(doc.data())
                            var data = { ...doc.data(), "docId": doc.id }
                            // var customerData = firebase.firestore().collection('users').doc(data.cunstomerId).get()
                            if (data.isConfirm ==  true) {
                                subscriptions.push(data)
                            }
                            // console.log(shops)
                        });
                        // console.log(subscription)
                    } else {
                        console.log('Errrroooor')
                        
                    }
                })
            }
        })
        // console.log('Hiiiii')

        dispatch({
            type: LIST_SUBSCRIPTIONS_SUCCESS,
            payload: subscriptions
        })

    } catch (error) {
        console.log(error)
    }
}