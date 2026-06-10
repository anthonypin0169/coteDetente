import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice.jsx"
import updateReducer from "./updateDataUserSlice.jsx"

const Store = configureStore({
    reducer : {
        auth : authReducer,
        updateData : updateReducer
    }
})

export default Store