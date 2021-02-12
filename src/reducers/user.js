import { USER_STATE_CHANGE, USER_DETAILS_REQUESTED, USER_DETAILS_SUCCESS} from '../constants/index'

const initialState = {
    currentUser: null
}

// export const user = (state = initialState, action) => {
//     // switch (action.type) {
//     //     case USER_STATE_CHANGE:
//     //         return {...state, currentUser: action.currentUser}
//     //     default:
//     //         return state
//     // }
//     return {
//         ...state,
//         currentUser: action.currentUser
//     }
// }

export const userDetailsReducer= (state = {user: {}}, action) => {
    switch (action.type) {
        // case USER_DETAILS_REQUESTED:
        //     return {...state, loading: true}
        case USER_DETAILS_SUCCESS:
            // console.log('Hiii');
            return {loading: false, user: action.payload}
        default:
            return state
    }
}
