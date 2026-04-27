import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

// Thunk para login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Simulación de login - en producción usar API real
      const response = {
        data: {
          token: 'jwt_token_simulado_' + Date.now(),
          user: {
            id: 1,
            name: 'Administrador',
            email: credentials.email,
            role: 'admin'
          }
        }
      }
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk para logout
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  return null
})

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
