import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './features/pokemonsSlice'
import cartReducer from './features/cartSlice'

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;