import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../slices/selectedItemsSlice';
import Flyout from './Flyout';
import '@testing-library/jest-dom';

vi.mock('../hooks/useTheme', () => ({
  useTheme: () => true,
}));

const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState = {} } = {},
) => {
  const store = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState: {
      selectedItems: {
        items: [{ uid: '1', name: 'Lion', earthAnimal: true }],
        ...preloadedState,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Flyout', () => {
  it('should render the download and unselectAll buttons and number of selected animals', () => {
    renderWithProviders(<Flyout />);

    const downloadButton = screen.getByRole('button', { name: /Download/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveTextContent(/Download/i);

    const unselectButton = screen.getByRole('button', {
      name: /Unselect all/i,
    });
    expect(unselectButton).toBeInTheDocument();

    expect(screen.getByText(/1 animals are selected/i)).toBeInTheDocument();
  });
});
