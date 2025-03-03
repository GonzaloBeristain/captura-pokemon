import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Pokemon {
  name: string
  url: string
}

interface PokemonsState {
  list: Pokemon[]
}

const initialState: PokemonsState = {
  list: [],
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.list = action.payload
    },
  },
})

export const { setPokemons } = pokemonsSlice.actions

export const fetchPokemons = () => async (dispatch: any) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await response.json()
    dispatch(setPokemons(data.results))
  } catch (error) {
    console.error(error)
  }
}

export default pokemonsSlice.reducer