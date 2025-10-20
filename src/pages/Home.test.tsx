import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from './Home';
import { RootState } from '../store';

// Mock the fetchPokemons thunk to return a plain object
vi.mock('../features/pokemonsSlice', () => ({
  fetchPokemons: vi.fn(() => ({ type: 'pokemons/fetchPokemons/pending' })),
}));

const mockStore = configureStore<RootState>([]);

describe('Home component', () => {
  it('renders the main heading', () => {
    const initialState = {
      pokemons: {
        list: [],
        status: 'idle',
        error: null,
      },
      cart: {
        captured: [],
      }
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const heading = screen.getByText(/Selecciona tu Pokémon y captúralo!!!/i);
    expect(heading).toBeInTheDocument();
  });
});
