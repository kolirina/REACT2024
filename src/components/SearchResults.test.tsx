import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store';
import SearchResults from './SearchResults';
import { useTheme } from '../hooks/useTheme';
import { Animal } from '../types';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;

describe('SearchResults Component', () => {
  const mockOnAnimalDetailSelect = vi.fn();

  beforeEach(() => {
    mockUseTheme.mockClear();
    mockOnAnimalDetailSelect.mockClear();
  });

  it('should render a message when there are no results', () => {
    mockUseTheme.mockReturnValue(false);

    render(
      <Provider store={store}>
        <SearchResults
          results={[]}
          onAnimalDetailSelect={mockOnAnimalDetailSelect}
        />
      </Provider>,
    );

    expect(
      screen.getByText('No animal found. Try again😸'),
    ).toBeInTheDocument();
  });

  it('should render animal names as buttons', () => {
    const mockResults: Animal[] = [
      { uid: '1', name: 'Lion', descriptions: ['Big cat'] },
      { uid: '2', name: 'Elephant', descriptions: ['Large mammal'] },
    ];

    mockUseTheme.mockReturnValue(false);

    render(
      <Provider store={store}>
        <SearchResults
          results={mockResults}
          onAnimalDetailSelect={mockOnAnimalDetailSelect}
        />
      </Provider>,
    );

    mockResults.forEach((animal) => {
      const button = screen.getByRole('button', { name: animal.name });
      expect(button).toBeInTheDocument();
    });
  });

  it('should call onAnimalDetailSelect with the correct animal on button click', () => {
    const mockResults: Animal[] = [
      { uid: '1', name: 'Lion', descriptions: ['Big cat'] },
    ];

    mockUseTheme.mockReturnValue(false);

    render(
      <Provider store={store}>
        <SearchResults
          results={mockResults}
          onAnimalDetailSelect={mockOnAnimalDetailSelect}
        />
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'Lion' });
    fireEvent.click(button);

    expect(mockOnAnimalDetailSelect).toHaveBeenCalledWith(mockResults[0]);
  });

  it('should apply the correct theme class based on useTheme hook', () => {
    const mockResults: Animal[] = [
      { uid: '1', name: 'Lion', descriptions: ['Big cat'] },
    ];

    mockUseTheme.mockReturnValue(false);
    const { rerender } = render(
      <Provider store={store}>
        <SearchResults
          results={mockResults}
          onAnimalDetailSelect={mockOnAnimalDetailSelect}
        />
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'Lion' });
    expect(button).toHaveClass('light-animalLink');

    mockUseTheme.mockReturnValue(true);
    rerender(
      <Provider store={store}>
        <SearchResults
          results={mockResults}
          onAnimalDetailSelect={mockOnAnimalDetailSelect}
        />
      </Provider>,
    );

    expect(button).toHaveClass('dark-animalLink');
  });
});
