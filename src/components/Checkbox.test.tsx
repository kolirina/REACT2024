import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import Checkbox from './Checkbox';
import selectedItemsReducer, { toggleItem } from '../slices/selectedItemsSlice';
import { SelectedItem } from '../types';
import { Provider, useDispatch, useSelector } from 'react-redux';

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

describe('Checkbox Component', () => {
  let store: ReturnType<typeof configureStore>;
  let mockDispatch: Mock;

  beforeEach(() => {
    mockDispatch = vi.fn();

    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
    });
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('should be checked if item is selected', () => {
    const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

    (useSelector as unknown as Mock).mockReturnValue([mockItem]);

    render(
      <Provider store={store}>
        <Checkbox item={mockItem} />
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should be unchecked if item is not selected', () => {
    const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

    (useSelector as unknown as Mock).mockReturnValue([]);

    render(
      <Provider store={store}>
        <Checkbox item={mockItem} />
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should dispatch toggleItem action on checkbox change', () => {
    const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

    render(
      <Provider store={store}>
        <Checkbox item={mockItem} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(mockDispatch).toHaveBeenCalledWith(toggleItem(mockItem));
  });
});
