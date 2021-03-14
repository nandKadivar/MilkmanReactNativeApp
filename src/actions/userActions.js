import { USER_DETAILS_REQUESTED ,USER_DETAILS_SUCCESS, SEND_SUBSCRIPTIONREQUEST_SUCCESS, CHANGE_THEME} from '../constants/index'
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