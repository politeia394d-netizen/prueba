import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  movements: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setMovements: (state, action) => {
      state.movements = action.payload;
    },
    addMovement: (state, action) => {
      state.movements.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setCategories,
  setMovements,
  addMovement,
  setLoading,
  setError,
} = inventorySlice.actions;

export default inventorySlice.reducer;
