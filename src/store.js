import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { getUserReducer } from './reducers/user'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store