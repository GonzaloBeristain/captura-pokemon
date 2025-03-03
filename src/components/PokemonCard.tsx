import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice.ts'
import { RootState } from '../store.tsx'

interface PokemonCardProps {
    pokemon: {
        name: string
        url: string
    }
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const dispatch = useDispatch();
    const captured = useSelector((state: RootState) => state.cart.captured);
    const [alert, setAlert] = useState<{ message: string, type: string } | null>(null)

    const handleClick = () => {
        if(!captured.includes(pokemon.url)){
            dispatch(addToCart(pokemon.url))

            setAlert({ message: '¡Pokémon capturado!', type: 'success' })
            setTimeout(() => setAlert(null), 1000)
        } else {
            setAlert({ message: '¡Este Pokémon ya está en tu equipo!', type: 'warning' })
            setTimeout(() => setAlert(null), 2000)
        }
    };

    return (
    <div>
        <div
        className="w-24 h-24 m-2 flex justify-center items-center bg-gradient-to-l from-red-400 to-red-800 rounded-full cursor-pointer transition-colors duration-300 hover:from-green-500 hover:to-green-800 active:from-green-800 active:to-blue-600"
        onClick={handleClick}
        >
            <img
                src={pokemon.url}
                alt={pokemon.name}
                className="w-16 h-16 rounded-full"
            />
        </div>

        {/* Alerta de éxito o error */}
        {alert && (
            <div
            className={`absolute bottom-0 left-0 p-4 m-4 text-white rounded ${
                alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
            >
            {alert.message}
            </div>
        )}
    </div>    
    )
};

export default PokemonCard;