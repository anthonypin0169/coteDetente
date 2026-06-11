import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateDataUser = createAsyncThunk(
    'update/userData',
    async () => {
        
    }
)

const initialState = {
    token: null,
    email: null,
    lastname: null,
    firstname: null
}

const uptdateDataUserSlice = createSlice({
    name: 'updateData',
    initialState,
    reducers: {},
    extraReducers: () => {
       
    }
})

export default uptdateDataUserSlice.reducer