// ThemeProvider.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ThemeProvider,
  ThemeContext,
  ThemeContextUpdate,
} from './ThemeContext';

const TestComponent = () => {
  const darkTheme = React.useContext(ThemeContext);
  const toggleTheme = React.useContext(ThemeContextUpdate);

  return (
    <div>
      <span data-testid="theme-status">
        {darkTheme ? 'Dark Theme' : 'Light Theme'}
      </span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('should render without crashing', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-status')).toBeInTheDocument();
  });

  it('should provide the correct initial theme context value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('Light Theme');
  });

  it('should update the theme context value when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const status = screen.getByTestId('theme-status');
    const toggleButton = screen.getByText('Toggle Theme');

    expect(status).toHaveTextContent('Light Theme');

    fireEvent.click(toggleButton);

    expect(status).toHaveTextContent('Dark Theme');
  });
});
