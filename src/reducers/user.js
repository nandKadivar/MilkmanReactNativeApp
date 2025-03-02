import { USER_STATE_CHANGE, USER_DETAILS_REQUESTED, USER_DETAILS_SUCCESS,CHANGE_THEME,LIST_ADMINNOTIFICATIONS_REQUESTED,LIST_ADMINNOTIFICATIONS_SUCCESS,LIST_SUBSCRIPTIONS_REQUESTED,LIST_SUBSCRIPTIONS_SUCCESS} from '../constants/index'

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
        case USER_DETAILS_REQUESTED:
            return {...state, userLoading: true}
        case USER_DETAILS_SUCCESS:
            // console.log('Hiii');
            return {userLoading: false, user: action.payload}
        default:
            return state
    }
}

export const changeThemeReducer = (state = { mode: {} }, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {mode: action.payload}
        default:
            return state
    }
}

export const subscriptionRequestsReducer = (state = { subscriptionRequests: [] }, action) => {
    switch (action.type) {
        case LIST_ADMINNOTIFICATIONS_REQUESTED:
            return {...state,subscriptionRequestsLoading: true}
        case LIST_ADMINNOTIFICATIONS_SUCCESS:
            return {subscriptionRequestsLoading: false,subscriptionRequests: action.payload}
        default:
            return state
    }
}

export const subscriptionsReducer = (state = { subscriptions: [] }, action) => {
    switch (action.type) {
        case LIST_SUBSCRIPTIONS_REQUESTED:
            return {...state,subscriptionsLoading: true}
        case LIST_SUBSCRIPTIONS_SUCCESS:
            return {subscriptionsLoading: false,subscriptions: action.payload}
        default:
            return state
    }
}
