import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPokemons } from '../features/pokemonsSlice.ts'
import PokemonCard from '../components/PokemonCard.tsx'
import Cart from '../components/Cart.tsx'
import type { RootState, AppDispatch } from '../store.tsx'

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const pokemons = useSelector((state: RootState) => state.pokemons.list)

    useEffect(() => {
        dispatch(fetchPokemons())
    }, [dispatch])

    return (
        <div className="flex p-1 bg-black">
            <div className="w-2/3 bg-gradient-to-l from-amber-300 to-amber-500">
                <h1 className="text-3xl mb-3 p-3 text-gray-200 font-bold bg-gradient-to-l from-amber-800 to-amber-700">Selecciona tu Pokémon y captúralo!!!</h1>
                <div className="flex flex-wrap">
                {pokemons.map(pokemon => {
                    const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
                    return (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={{
                        name: pokemon.name,
                        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
                        }}
                    />
                    )
                })}
                </div>
            </div>
            <div className="w-1/3 ml-1 bg-gradient-to-r from-red-700 to-amber-700">
                <Cart />
            </div>
        </div>
    )
}

export default Home;