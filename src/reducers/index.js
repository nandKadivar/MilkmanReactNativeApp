import { combineReducers } from 'redux'
import { userDetailsReducer } from './user'
import {listShopsReducer} from './shop'
// import {shop} from './shop'

const Reducers = combineReducers({
    userDetails: userDetailsReducer, 
    shopDetails: listShopsReducer
})

export default Reducers