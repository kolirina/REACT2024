import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi, describe, it, expect, Mock } from 'vitest';
import Checkbox from './Checkbox';
import selectedItemsReducer, { toggleItem } from '../slices/selectedItemsSlice';
export interface SelectedItem {
  uid: string;
  name: string;
  description?: string;
}

interface RootState {
  selectedItems: {
    items: SelectedItem[];
  };
}

const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: (selector: (state: RootState) => unknown) =>
      selector({ selectedItems: { items: [mockItem] } } as RootState),
  };
});

describe('Checkbox Component', () => {
  const store = configureStore({
    reducer: {
      selectedItems: selectedItemsReducer,
    },
    preloadedState: {
      selectedItems: {
        items: [mockItem],
      },
    },
  });

  it('renders the checkbox correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkbox item={mockItem} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('checks the checkbox if the item is selected', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkbox item={mockItem} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('dispatches toggleItem action on checkbox change', () => {
    const dispatch = vi.fn();

    (useDispatch as unknown as Mock).mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Checkbox item={mockItem} />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(dispatch).toHaveBeenCalledWith(toggleItem(mockItem));
  });
});
