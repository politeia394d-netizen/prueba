import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialCategories = [
  { id: 1, name: 'Electrónica', description: 'Productos electrónicos y tecnología' },
  { id: 2, name: 'Accesorios', description: 'Accesorios para computadoras' },
  { id: 3, name: 'Mobiliario', description: 'Muebles de oficina' },
]

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const stored = localStorage.getItem('categories')
  return stored ? JSON.parse(stored) : initialCategories
})

export const addCategory = createAsyncThunk('categories/add', async (category) => {
  const stored = localStorage.getItem('categories')
  const categories = stored ? JSON.parse(stored) : initialCategories
  const newCategory = { ...category, id: Date.now() }
  categories.push(newCategory)
  localStorage.setItem('categories', JSON.stringify(categories))
  return newCategory
})

export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  const stored = localStorage.getItem('categories')
  const categories = stored ? JSON.parse(stored) : initialCategories
  const filtered = categories.filter(c => c.id !== id)
  localStorage.setItem('categories', JSON.stringify(filtered))
  return id
})

const initialState = {
  items: [],
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload)
      })
  }
})

export default categoriesSlice.reducer
