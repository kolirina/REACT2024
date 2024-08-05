import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import NotFound from './404';

vi.mock('../src/hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('NotFound Component', () => {
  it('should display correct error message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 Not Found 😿')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.'),
    ).toBeInTheDocument();
  });
});
