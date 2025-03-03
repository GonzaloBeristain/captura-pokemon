import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { removeFromCart } from '../features/cartSlice.ts';

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const captured = useSelector((state: RootState) => state.cart.captured);
    const [alert, setAlert] = useState<{ message: string, type: string } | null>(null)

    const handleClick = (pokemonName: string) => {
        dispatch(removeFromCart(pokemonName))

        setAlert({ message: '¡Pokémon eliminado!', type: 'warning' })
            setTimeout(() => setAlert(null), 1000)
    };

    return (
        <div>
            <section className='flex bg-gradient-to-l from-red-700 to-amber-950 p-3'>
                <h2 className="text-xl md:text-2xl text-slate-200 font-semibold">Pokémon Capturados:</h2>
                <div className={`rounded-full ml-2 text-xl font-semibold ${captured.length > 0 ? 'bg-green-800' : 'bg-red-700'}`}>
                    <span className='flex justify-center items-center text-slate-300 mx-3'>{captured.length}</span>
                </div>
            </section>
            <div className="flex flex-wrap">
                {captured.map((pokemon, index) => (
                <div key={index} className="w-24 h-24 m-6 flex flex-col justify-center items-center bg-gradient-to-l from-green-500 to-green-800 rounded-full transition-all duration-500 hover:scale-150 hover:rotate-3">
                    <img className='w-16 h-16 rounded-full' src={pokemon} />
                    <button onClick={()=> handleClick(pokemon)} className='text-slate-200 font-bold cursor-pointer transition-colors duration-300 hover:text-red-700'>X</button>
                </div>
                ))}
            </div>
            
            {/* Alerta de éxito o error */}
            {alert && (
                <div
                className={`absolute bottom-0 left-0 p-4 m-4 text-white rounded ${
                    alert.type === 'warning' ? 'bg-red-500' : 'bg-red-500'
                }`}
                >
                    {alert.message}
                </div>
            )}
        </div>
    )
};

export default Cart;