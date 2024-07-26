import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import Checkbox from './Checkbox';
import selectedItemsReducer, { toggleItem } from '../slices/selectedItemsSlice';
import { SelectedItem } from '../types';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Partially mock react-redux using importOriginal
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
    // Create a mock dispatch function
    mockDispatch = vi.fn();

    // Clear all mocks before each test
    vi.clearAllMocks();

    // Set up the Redux store
    store = configureStore({
      reducer: {
        selectedItems: selectedItemsReducer,
      },
    });

    // Set up useDispatch mock to return the mock dispatch
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  //   it('should render checkbox correctly', () => {
  //     const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

  //     render(
  //       <Provider store={store}>
  //         <Checkbox item={mockItem} />
  //       </Provider>,
  //     );

  //     expect(screen.getByRole('checkbox')).toBeInTheDocument();
  //   });

  it('should be checked if item is selected', () => {
    const mockItem: SelectedItem = { uid: '1', name: 'Test Item' };

    // Mock useSelector to return selected items including mockItem
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

    // Mock useSelector to return an empty array (no selected items)
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
