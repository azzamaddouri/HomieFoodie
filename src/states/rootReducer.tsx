import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "@states/reducers/userSlice"
import cartReducer from "./reducers/cartSlice";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

export default rootReducer;