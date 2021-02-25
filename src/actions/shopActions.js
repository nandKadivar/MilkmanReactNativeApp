import { LIST_SHOPS_REQUESTED,LIST_SHOPS_SUCCESS } from '../constants/index'
import firebase from 'firebase'

export const listShops = () => async (dispatch) => {
    try {
        dispatch({
            type: LIST_SHOPS_REQUESTED
        })

        let shops = []
        await firebase.firestore().collection('users').where('isShopOwner', '==', true).get().then((snapshot) => {
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