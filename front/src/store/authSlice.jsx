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
            const role = loginData.user.role
            localStorage.setItem("token", token)
            localStorage.setItem("role", role)

            return { token, user : loginData.user }
            } catch(error) {
                return rejectWithValue(error.message)
            }
    }
)
const storedToken = localStorage.getItem("token")
const storedRole = localStorage.getItem("role")

const isTokenValid = () => {
    if (!storedToken) return false
    try {
        const payload = JSON.parse(atob(storedToken.split('.')[1]))
        return payload.exp > Date.now() / 1000
    } catch {
        return false
    }
}

const tokenValid = isTokenValid()

if (!tokenValid && storedToken) {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
}

const initialState = {
    token: tokenValid ? storedToken : null,
    isAuthenticated: tokenValid,
    isLoading: false,
    error: null,
    role: tokenValid ? storedRole : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout : (state) => {
            state.isAuthenticated = false
            state.token = null
            state.role = null
            localStorage.removeItem("token")
            localStorage.removeItem("role")
        },
        clearError : (state) => {
            state.error = null
        }
    },
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

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer