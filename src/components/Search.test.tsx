import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Search from './search';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to localStorage when clicking Search button', () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByPlaceholderText('Find an Animal 🔍');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'dog' } });

    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('dog');
  });

  it('retrieves the value from localStorage upon mounting', () => {
    localStorage.setItem('searchTerm', 'cat');

    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Find an Animal 🔍');
    expect(input).toHaveValue('cat');
  });
});
