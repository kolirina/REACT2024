import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Home from './index';
import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
import { useSearchAnimalsQuery } from '../src/services/apiSlice';
import selectedItemsReducer from '../src/slices/selectedItemsSlice';
import loadingReducer from '../src/slices/loadingSlice';
import loadingMiddleware from '../src/middleware/loadingMiddleware';
import '@testing-library/jest-dom';
import paginationReducer from '../src/slices/paginationSlice';

vi.mock('../src/hooks/useTheme', () => ({
  useTheme: vi.fn(),
  useThemeUpdate: vi.fn(),
}));

vi.mock('../src/services/apiSlice', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../src/services/apiSlice')>();
  return {
    ...actual,
    useSearchAnimalsQuery: vi.fn(),
    useGetAnimalDetailsQuery: vi.fn(),
  };
});

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;
const mockUseThemeUpdate = useThemeUpdate as unknown as ReturnType<
  typeof vi.fn
>;
const mockUseSearchAnimalsQuery =
  useSearchAnimalsQuery as unknown as ReturnType<typeof vi.fn>;
const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;

describe('Home Component', () => {
  const mockSearchData = {
    animals: [{ uid: '1', name: 'Lion', descriptions: ['Big cat'] }],
    page: { totalPages: 5 },
  };

  beforeEach(() => {
    mockUseTheme.mockClear();
    mockUseThemeUpdate.mockClear();
    mockUseSearchAnimalsQuery.mockClear();
    mockUseRouter.mockClear();
  });

  it('should render and display the loading state', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseSearchAnimalsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    mockUseRouter.mockReturnValue({
      query: { page: '1' },
      push: vi.fn(),
      replace: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should render search results and pagination', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseSearchAnimalsQuery.mockReturnValue({
      data: mockSearchData,
      isLoading: false,
    });
    mockUseRouter.mockReturnValue({
      query: { page: '1', search: '' },
      push: vi.fn(),
      replace: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    expect(screen.getByText('Lion')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  it('should toggle theme', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseThemeUpdate.mockReturnValue(() => {});

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    const toggleButton = screen.getByText('🌜 Dark Mode');
    fireEvent.click(toggleButton);

    expect(mockUseThemeUpdate).toHaveBeenCalled();
  });

  it('should handle search and update URL', () => {
    const mockPush = vi.fn();
    mockUseRouter.mockReturnValue({
      query: { page: '1' },
      push: mockPush,
      replace: vi.fn(),
    });

    mockUseTheme.mockReturnValue(false);
    mockUseSearchAnimalsQuery.mockReturnValue({
      data: mockSearchData,
      isLoading: false,
    });

    render(
      <Provider store={mockStore}>
        <Home />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/Find an Animal/i);
    fireEvent.change(searchInput, { target: { value: 'Lion' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/?search=Lion&page=1', undefined, {
      shallow: true,
    });
  });
});
