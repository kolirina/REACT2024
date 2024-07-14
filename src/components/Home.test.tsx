import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Throw Error/i)).toBeInTheDocument();
  });

  it('renders search results when data is loaded', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).toBeNull();
    });

    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.queryByText(/No animal found/i)).toBeNull();
    expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
  });
});
