import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../app/mainpage/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


describe('Home component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  const queryClient = new QueryClient();

  // check title of the page
  test('check title of homepage', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    await waitFor(() => {
      const title = screen.getByTestId('title')
      expect(title).toHaveTextContent('Pokemon Infinite List');
    })
  })

  // render data list pokemons
  test('renders list of pokemons', async () => {
    // Mock the fetch request
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: 'bulbasaur' },
          { name: 'charmander' },
          { name: 'squirtle' },
        ],
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );


    // Wait for the fetch to complete and render the pokemons
    await waitFor(() => {
      const pokemonNames = screen.getAllByTestId('pokemon-name');
      expect(pokemonNames).toHaveLength(3);
      expect(pokemonNames[0]).toHaveTextContent('bulbasaur');
      expect(pokemonNames[1]).toHaveTextContent('charmander');
      expect(pokemonNames[2]).toHaveTextContent('squirtle');
    });
  });

});
