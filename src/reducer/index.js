import {combineReducers} from "redux"
import authSlice from "../slices/authSlice"
const rootReducer = combineReducers({
    auth:authSlice,
})
export default  rootReducer