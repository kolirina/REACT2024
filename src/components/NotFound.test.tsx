import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

it('should have search results', () => {
  render(<NotFound />);
  const title = screen.queryByText(/Not Found/i);
  expect(title).toBeVisible();
});
