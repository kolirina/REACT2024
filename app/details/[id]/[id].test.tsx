import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AnimalDetailPage from './page';
import { useTheme, useThemeUpdate } from '../../../src/hooks/useTheme';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import selectedItemsReducer from '../../../src/slices/selectedItemsSlice';
import loadingReducer from '../../../src/slices/loadingSlice';
import {
  fetchAnimalDetails,
  fetchAnimalData,
} from '../../../src/services/fetchAnimalData';

vi.mock('../../../src/hooks/useTheme', () => ({
  useTheme: vi.fn(),
  useThemeUpdate: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../../src/services/fetchAnimalData', () => ({
  fetchAnimalDetails: vi.fn(),
  fetchAnimalData: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    loading: loadingReducer,
  },
});

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;
const mockUseThemeUpdate = useThemeUpdate as unknown as ReturnType<
  typeof vi.fn
>;
const mockUseRouter = useRouter as unknown as ReturnType<typeof vi.fn>;
const mockUseSearchParams = useSearchParams as unknown as ReturnType<
  typeof vi.fn
>;
const mockUseParams = useParams as unknown as ReturnType<typeof vi.fn>;
const mockFetchAnimalDetails = fetchAnimalDetails as unknown as ReturnType<
  typeof vi.fn
>;
const mockFetchAnimalData = fetchAnimalData as unknown as ReturnType<
  typeof vi.fn
>;

describe('AnimalDetailPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render and display the loading state', () => {
    mockUseTheme.mockReturnValue(false);
    mockUseSearchParams.mockReturnValue({ get: vi.fn().mockReturnValue('1') });
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseRouter.mockReturnValue({ push: vi.fn() });

    render(
      <Provider store={mockStore}>
        <AnimalDetailPage />
      </Provider>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should fetch and display animal details', async () => {
    const mockAnimal = { uid: '1', name: 'Lion', description: '' };
    mockFetchAnimalDetails.mockResolvedValue(mockAnimal);
    mockUseTheme.mockReturnValue(false);
    mockUseSearchParams.mockReturnValue({ get: vi.fn().mockReturnValue('1') });
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseRouter.mockReturnValue({ push: vi.fn() });

    render(
      <Provider store={mockStore}>
        <AnimalDetailPage />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Lion')).toBeInTheDocument();
      expect(
        screen.getByText('an infinitely cute animal 👻'),
      ).toBeInTheDocument();
    });
  });

  it('should handle search and update URL', () => {
    const mockPush = vi.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });
    mockUseSearchParams.mockReturnValue({ get: vi.fn().mockReturnValue('1') });
    mockUseParams.mockReturnValue({ id: '1' });
    mockUseTheme.mockReturnValue(false);

    render(
      <Provider store={mockStore}>
        <AnimalDetailPage />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(/Find an Animal/i);
    fireEvent.change(searchInput, { target: { value: 'Lion' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/details/1?search=Lion&page=1');
  });

  it('should toggle theme', () => {
    const toggleThemeMock = vi.fn();
    mockUseTheme.mockReturnValue(false);
    mockUseThemeUpdate.mockReturnValue(toggleThemeMock);

    render(
      <Provider store={mockStore}>
        <AnimalDetailPage />
      </Provider>,
    );

    const toggleButton = screen.getByText('🌜 Dark Mode');
    fireEvent.click(toggleButton);

    expect(toggleThemeMock).toHaveBeenCalled();
  });

  it('should display the correct number of pages in pagination', async () => {
    const mockAnimalData = {
      initialAnimals: [{ uid: '1', name: 'Lion' }],
      totalPages: 5,
    };
    mockFetchAnimalData.mockResolvedValue(mockAnimalData);
    mockUseTheme.mockReturnValue(false);
    mockUseSearchParams.mockReturnValue({ get: vi.fn().mockReturnValue('1') });
    mockUseRouter.mockReturnValue({ push: vi.fn() });

    render(
      <Provider store={mockStore}>
        <AnimalDetailPage />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    });
  });
});
