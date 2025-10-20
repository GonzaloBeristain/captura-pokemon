import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './Home';
import cartReducer from '../features/cartSlice';
import pokemonsReducer from '../features/pokemonsSlice';

// Datos de prueba para simular la respuesta de la API
const mockPokemons = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
];

// Mockear la función global `fetch` antes de cada test
beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: vi.fn().mockResolvedValue({ results: mockPokemons }),
  } as any);
});

// Limpiar los mocks después de cada test para evitar interferencias
afterEach(() => {
  vi.restoreAllMocks();
});

// Crear una tienda de Redux real para el test
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      pokemons: pokemonsReducer,
      cart: cartReducer,
    },
    preloadedState: initialState,
  });
};

describe('Home component full user flow', () => {
  it('should render pokemons, allow capturing one, and then removing it from the cart', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // 1. Verificar que el título principal se renderiza
    expect(screen.getByText(/Selecciona tu Pokémon y captúralo!!!/i)).toBeInTheDocument();

    // 2. Esperar y verificar que las tarjetas de los Pokémon aparecen
    const bulbasaurCard = await screen.findByAltText('bulbasaur');
    const charmanderCard = await screen.findByAltText('charmander');
    expect(bulbasaurCard).toBeInTheDocument();
    expect(charmanderCard).toBeInTheDocument();

    // 3. Verificar que el carrito está inicialmente vacío
    const initialCartCounter = screen.getByText('0').closest('div');
    expect(initialCartCounter).toHaveClass('bg-red-700');

    // 4. Simular la captura de Bulbasaur
    fireEvent.click(bulbasaurCard);

    // 5. Verificar que el contador del carrito se actualiza a "1"
    const updatedCartCounter = await screen.findByText('1');
    expect(updatedCartCounter).toBeInTheDocument();
    expect(updatedCartCounter.closest('div')).toHaveClass('bg-green-800');

    // 6. Verificar que Bulbasaur aparece en la sección de capturados
    // Usamos `within` para buscar la imagen solo dentro del carrito
    const cart = screen.getByText(/Pokémon Capturados:/i).closest('div');
    const capturedBulbasaurImg = await screen.findByRole('img', { name: /bulbasaur/i });
    expect(capturedBulbasaurImg).toBeInTheDocument();


    // 7. Simular que se elimina el Pokémon del carrito
    const removeButton = screen.getByRole('button', { name: 'X' });
    fireEvent.click(removeButton);

    // 8. Verificar que el contador del carrito vuelve a "0"
    const finalCartCounter = await screen.findByText('0');
    expect(finalCartCounter).toBeInTheDocument();
    expect(finalCartCounter.closest('div')).toHaveClass('bg-red-700');

    // 9. Verificar que el Pokémon ha desaparecido del carrito,
    // comprobando que ya no hay un botón "X"
    expect(screen.queryByRole('button', { name: 'X' })).not.toBeInTheDocument();
  });
});
