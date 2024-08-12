import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AnimalDetailsPage from './[id]';
import { useTheme, useThemeUpdate } from '../../src/hooks/useTheme';
import { useRouter } from 'next/router';
import selectedItemsReducer from '../../src/slices/selectedItemsSlice';
import loadingReducer from '../../src/slices/loadingSlice';
import loadingMiddleware from '../../src/middleware/loadingMiddleware';
import { apiSlice } from '../../src/services/apiSlice';

vi.mock('../../src/hooks/useTheme', () => ({
  useTheme: vi.fn(),
  useThemeUpdate: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    loading: loadingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, loadingMiddleware),
});

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;
const mockUseThemeUpdate = useThemeUpdate as unknown as ReturnType<
  typeof vi.fn
>;
const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;

describe('AnimalDetailsPage Component', () => {
  const mockSearchData = {
    animals: [{ uid: '1', name: 'Lion', descriptions: ['Big cat'] }],
    page: { totalPages: 5 },
  };

  beforeEach(() => {
    mockUseTheme.mockClear();
    mockUseThemeUpdate.mockClear();
    mockUseRouter.mockClear();
  });

  it('should render and display the loading state', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseRouter.mockReturnValue({
      query: { page: '1' },
      push: vi.fn(),
      replace: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <AnimalDetailsPage
          initialSearchTerm=""
          initialPage={1}
          initialAnimals={[]}
          totalPages={1}
          initialClickedAnimal={{
            uid: '1',
            name: 'Lion',
            descriptions: ['Big cat'],
          }}
        />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render search results and pagination', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseRouter.mockReturnValue({
      query: { page: '1', search: '' },
      push: vi.fn(),
      replace: vi.fn(),
    });

    render(
      <Provider store={mockStore}>
        <AnimalDetailsPage
          initialSearchTerm=""
          initialPage={1}
          initialAnimals={mockSearchData.animals}
          totalPages={mockSearchData.page.totalPages}
          initialClickedAnimal={{
            uid: '1',
            name: 'Lion',
            descriptions: [],
          }}
        />
      </Provider>,
    );

    expect(screen.getByText('Lion')).toBeInTheDocument();
    expect(
      screen.getByText('an infinitely cute animal 👻'),
    ).toBeInTheDocument();
  });

  it('should toggle theme', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseThemeUpdate.mockReturnValue(() => {});

    render(
      <Provider store={mockStore}>
        <AnimalDetailsPage
          initialSearchTerm=""
          initialPage={1}
          initialAnimals={[]}
          totalPages={1}
          initialClickedAnimal={{
            uid: '1',
            name: 'Lion',
            descriptions: ['Big cat'],
          }}
        />
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

    render(
      <Provider store={mockStore}>
        <AnimalDetailsPage
          initialSearchTerm=""
          initialPage={1}
          initialAnimals={[]}
          totalPages={1}
          initialClickedAnimal={{
            uid: '1',
            name: 'Lion',
            descriptions: ['Big cat'],
          }}
        />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/Find an Animal/i);
    fireEvent.change(searchInput, { target: { value: 'Lion' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith(
      '/details/1?search=Lion&page=1',
      undefined,
      {
        shallow: true,
      },
    );
  });
});
