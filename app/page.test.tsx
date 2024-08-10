import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import Home from './page';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';
import { configureStore } from '@reduxjs/toolkit';
import { useTheme } from '../src/hooks/useTheme';
import { fetchAnimalData } from '../src/services/fetchAnimalData';
import selectedItemsReducer from '../src/slices/selectedItemsSlice';
import loadingReducer from '../src/slices/loadingSlice';

vi.mock('../src/hooks/useTheme', () => ({
  useTheme: vi.fn(),
  useThemeUpdate: vi.fn(),
}));

vi.mock('../src/services/fetchAnimalData', () => ({
  fetchAnimalData: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    loading: loadingReducer,
  },
});

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;

const mockFetchAnimalData = fetchAnimalData as unknown as ReturnType<
  typeof vi.fn
>;
const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
const mockUseSearchParams = useSearchParams as unknown as ReturnType<
  typeof vi.fn
>;

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render and display the loading state', () => {
    mockUseTheme.mockReturnValue(false);
    mockFetchAnimalData.mockResolvedValue({
      initialAnimals: [],
      totalPages: 1,
    });
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
    });
    mockUseSearchParams.mockReturnValue({
      get: vi.fn(() => '1'),
    });

    render(
      <Provider store={mockStore}>
        <Home
          initialSearchTerm=""
          initialPage={1}
          initialAnimals={[]}
          totalPages={1}
        />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
