import {combineReducers} from 'redux'
import AuthUser from './auth'
import chatsReducer from './chat'
//Ở đay chúng ta có thể gộp nhiều reducers
// Ở ví dụ này mình chỉ có 1 reducers là noteReducers

export default combineReducers({
    auth: AuthUser
    chat: chatsReducer
})