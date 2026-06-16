import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, {rejectWithValue}) => {
        try{
            const loginResponse = await fetch("http://localhost:5000/api/auth/login",{
                method: "POST", 
                headers: {"content-Type":"application/json"},
                body: JSON.stringify(credentials)
            })
            if(!loginResponse.ok){
                throw new Error ("Identifiant incorrects")
            }
            const loginData = await loginResponse.json()
            const token = loginData.token
            localStorage.setItem("token", token)

            return { token, user : loginData.user }
            } catch(error) {
                return rejectWithValue(error.message)
            }
    }
)

const initialState = {
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    role: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
       builder.addCase(loginUser.pending, (state) =>{
        state.isLoading = true
        state.error = null
       })
       .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.role = action.payload.user.role
        state.token = action.payload.token
       })
       .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.error = action.payload
       })
    }
})

export default authSlice.reducer