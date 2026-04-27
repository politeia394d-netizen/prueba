import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialMovements = [
  { id: 1, productId: 1, productName: 'Laptop Dell Inspiron', type: 'entrada', quantity: 10, date: new Date().toISOString(), user: 'admin', notes: 'Compra inicial' },
  { id: 2, productId: 2, productName: 'Mouse Logitech MX', type: 'entrada', quantity: 50, date: new Date().toISOString(), user: 'admin', notes: 'Reposición de stock' },
  { id: 3, productId: 1, productName: 'Laptop Dell Inspiron', type: 'salida', quantity: 5, date: new Date().toISOString(), user: 'admin', notes: 'Venta a cliente' },
]

export const fetchMovements = createAsyncThunk('movements/fetchAll', async () => {
  const stored = localStorage.getItem('movements')
  return stored ? JSON.parse(stored) : initialMovements
})

export const addMovement = createAsyncThunk('movements/add', async (movement) => {
  const stored = localStorage.getItem('movements')
  const movements = stored ? JSON.parse(stored) : initialMovements
  const newMovement = { ...movement, id: Date.now(), date: new Date().toISOString() }
  movements.unshift(newMovement)
  localStorage.setItem('movements', JSON.stringify(movements))
  return newMovement
})

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    type: '',
    productId: ''
  }
}

const movementsSlice = createSlice({
  name: 'movements',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovements.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMovements.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchMovements.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addMovement.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
  }
})

export const { setFilters } = movementsSlice.actions
export default movementsSlice.reducer
