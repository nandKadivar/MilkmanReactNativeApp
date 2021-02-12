import { USER_DETAILS_REQUESTED ,USER_DETAILS_SUCCESS} from '../constants/index'
import firebase from 'firebase'

export const getUserDetails = () => async(dispatch) => {
    try {
        // dispatch({
        //     type: USER_DETAILS_REQUESTED
        // })

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