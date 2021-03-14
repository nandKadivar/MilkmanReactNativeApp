import { combineReducers } from 'redux'
import { userDetailsReducer, changeThemeReducer } from './user'
import {listShopsReducer} from './shop'
// import {shop} from './shop'

const Reducers = combineReducers({
    userDetails: userDetailsReducer, 
    shopDetails: listShopsReducer,
    DarkTheme: changeThemeReducer
})

export default Reducers