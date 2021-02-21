import { LIST_SHOPS_SUCCESS } from '../constants/index'
import firebase from 'firebase'

export const listShops = () => async (dispatch) => {
    try {
        // await firebase.firestore()
        //     .collection('users')
        //     .where('isShopOwner', '==', true)
        //     .get()
        //     .then((snapshot) => {
        //         if (snapshot.exists) {
        //             console.log("Hiiiiiiiiiiiii")
        //             dispatch({
        //                 type: LIST_SHOPS_SUCCESS,
        //                 payload: snapshot.data()
        //             })
        //         } else {
        //             console.log('Error while fetching shops data')
        //         }              
        //     })
        let shops = []
        const snapshot = await firebase.firestore().collection('users').where('isShopOwner', '==', true).get().then((snapshot) => {
            // console.log(snapshot)
            snapshot.forEach(doc => {
                // console.log(doc.data())
                var data = {...doc.data(),"id": doc.id}
                shops.push(data)
                // console.log(shops)
            });    
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