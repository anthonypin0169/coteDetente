import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateUser = createAsyncThunk(
    'auth/login',
    async () => {
        
    }
)

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: () => {
       
    }
})

export default authSlice.reducer