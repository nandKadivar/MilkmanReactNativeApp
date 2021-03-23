import { LIST_SHOPS_REQUESTED,LIST_SHOPS_SUCCESS,LIST_TODAYSSCHEDULE_REQUESTED, LIST_TODAYSSCHEDULE_SUCCESS } from '../constants/index'

// const initialState = {
//     shopsData: null
// }

// export const shop = (state = initialState, action) => {
//     // switch (action.type) {
//     //     case USER_STATE_CHANGE:
//     //         return {...state, currentUser: action.currentUser}
//     //     default:
//     //         return state
//     // }
//     return {
//         ...state,
//         shopsData: action.shopsData
//     }
// }

export const listShopsReducer = (state = {shops: {}}, action) => {
    switch (action.type) {
        case LIST_SHOPS_REQUESTED:
            return {shopsLoading:true}
        case LIST_SHOPS_SUCCESS:
            return { shopsLoading:false, shops: action.payload}
        default:
            return state
    }
}

export const scheduleReducer = (state = {scheduleDetails: []}, action) => {
    switch (action.type) {
        case LIST_TODAYSSCHEDULE_REQUESTED:
            return {scheduleDetailsLoading:true}
        case LIST_TODAYSSCHEDULE_SUCCESS:
            return { scheduleDetailsLoading:false, scheduleDetails: action.payload}
        default:
            return state
    }
}
