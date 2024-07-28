import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchResults from './searchResults';
import { useTheme } from '../hooks/useTheme';
import { store } from '../store';
import { Animal } from '../types';

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;

describe('SearchResults Component', () => {
  beforeEach(() => {
    mockUseTheme.mockClear();
  });

  it('should render a message when there are no results', () => {
    mockUseTheme.mockReturnValue(false); // Light theme

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults results={[]} />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText('No animal found. Try again😸'),
    ).toBeInTheDocument();
  });

  it('should render links with correct href attribute', () => {
    const mockResults: Animal[] = [
      { uid: '1', name: 'Lion', descriptions: ['Big cat'] },
    ];

    mockUseTheme.mockReturnValue(false); // Light theme

    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults results={mockResults} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText('Lion').closest('a')).toHaveAttribute(
      'href',
      '/details/1?search=&page=1',
    );
  });
});
