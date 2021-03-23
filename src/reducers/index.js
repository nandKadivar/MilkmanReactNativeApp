import { combineReducers } from 'redux'
import { userDetailsReducer, changeThemeReducer, subscriptionRequestsReducer,subscriptionsReducer } from './user'
import {listShopsReducer,scheduleReducer} from './shop'
// import {shop} from './shop'

const Reducers = combineReducers({
    userDetails: userDetailsReducer, 
    shopDetails: listShopsReducer,
    DarkTheme: changeThemeReducer,
    subscriptionRequests: subscriptionRequestsReducer,
    subscriptions: subscriptionsReducer,
    schedule: scheduleReducer
})

export default Reducers