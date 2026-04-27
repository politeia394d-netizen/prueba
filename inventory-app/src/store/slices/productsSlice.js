import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Datos simulados iniciales
const initialProducts = [
  { id: 1, name: 'Laptop Dell Inspiron', sku: 'DELL-001', category: 'Electrónica', price: 899.99, cost: 650.00, stock: 15, minStock: 5, description: 'Laptop para uso empresarial' },
  { id: 2, name: 'Mouse Logitech MX', sku: 'LOG-002', category: 'Accesorios', price: 79.99, cost: 45.00, stock: 50, minStock: 10, description: 'Mouse inalámbrico ergonómico' },
  { id: 3, name: 'Teclado Mecánico RGB', sku: 'KEY-003', category: 'Accesorios', price: 129.99, cost: 75.00, stock: 3, minStock: 8, description: 'Teclado mecánico con retroiluminación' },
  { id: 4, name: 'Monitor Samsung 27"', sku: 'SAM-004', category: 'Electrónica', price: 349.99, cost: 220.00, stock: 20, minStock: 5, description: 'Monitor Full HD IPS' },
  { id: 5, name: 'Silla Ergonómica', sku: 'CHR-005', category: 'Mobiliario', price: 299.99, cost: 180.00, stock: 8, minStock: 3, description: 'Silla de oficina ergonómica' },
]

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const stored = localStorage.getItem('products')
  return stored ? JSON.parse(stored) : initialProducts
})

export const addProduct = createAsyncThunk('products/add', async (product) => {
  const stored = localStorage.getItem('products')
  const products = stored ? JSON.parse(stored) : initialProducts
  const newProduct = { ...product, id: Date.now() }
  products.push(newProduct)
  localStorage.setItem('products', JSON.stringify(products))
  return newProduct
})

export const updateProduct = createAsyncThunk('products/update', async ({ id, ...updates }) => {
  const stored = localStorage.getItem('products')
  const products = stored ? JSON.parse(stored) : initialProducts
  const index = products.findIndex(p => p.id === id)
  if (index !== -1) {
    products[index] = { ...products[index], ...updates }
    localStorage.setItem('products', JSON.stringify(products))
    return products[index]
  }
  throw new Error('Producto no encontrado')
})

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  const stored = localStorage.getItem('products')
  const products = stored ? JSON.parse(stored) : initialProducts
  const filtered = products.filter(p => p.id !== id)
  localStorage.setItem('products', JSON.stringify(filtered))
  return id
})

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    lowStock: false
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = { search: '', category: '', lowStock: false }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload)
      })
  }
})

export const { setFilters, clearFilters } = productsSlice.actions
export default productsSlice.reducer
