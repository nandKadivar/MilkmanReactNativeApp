import firebase from 'firebase'
import {USER_STATE_CHANGE,LIST_SHOPS} from '../constants/index'

// export function fetchUser() {
//     return ((dispatch) => {
//         firebase.firestore()
//             .collection("users")
//             .doc(firebase.auth().currentUser.uid)
//             .get()
//             .then((snapshot) => {
//                 if (snapshot.exists) {
//                     // console.log(snapshot.data())
//                     dispatch({
//                         type: USER_STATE_CHANGE,
//                         currentUser: snapshot.data()
//                     })
//                 } else {
//                     console.log('User does not exist')
//                 }
//             })
//     })
// }

// export function fetchShops() {
//     return ((dispatch) => {
//         firebase.firestore()
//             .collection("users")
//             .where('isShopOwner', '=', true)
//             .get()
//             .then((snapshot) => {
//                 if (snapshot.exists) {
//                     dispatch({
//                         type: LIST_SHOPS,
//                         shopsData: snapshot.data()
//                     })
//                 } else {
//                     console.log('Erro in fetching shops data')
//                 }
//             })
//     })
// }