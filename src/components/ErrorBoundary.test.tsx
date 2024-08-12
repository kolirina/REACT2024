import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

test('ErrorBoundary component', async () => {
  const ThrowErrorComponent = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ThrowErrorComponent />
    </ErrorBoundary>,
  );

  expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /Restart/ })).toBeInTheDocument();
});
