import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  captured: string[]
}

const initialState: CartState = {
  captured: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.captured.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.captured = state.captured.filter(pokemon => pokemon !== action.payload)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;