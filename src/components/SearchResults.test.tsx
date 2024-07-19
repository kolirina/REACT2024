import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import SearchResults from './searchResults';

// const mockResults = [
//   { uid: '1', name: 'Animal 1', descriptions: ['Earth Animal 🐾'] },
//   { uid: '2', name: 'Animal 2', descriptions: ['Avian 🦜'] },
// ];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn().mockReturnValue({
      search: '?search=test',
      pathname: '/',
    }),
  };
});

describe('SearchResults Component', () => {
  // it('renders the list of search results', () => {
  //   render(
  //     <BrowserRouter>
  //       <SearchResults results={mockResults} />
  //     </BrowserRouter>,
  //   );

  //   const resultItems = screen.getAllByRole('listitem');
  //   expect(resultItems).toHaveLength(mockResults.length);
  // });

  // it('creates the correct links for each result', () => {
  //   render(
  //     <BrowserRouter>
  //       <SearchResults results={mockResults} />
  //     </BrowserRouter>,
  //   );

  //   mockResults.forEach((result) => {
  //     const linkElement = screen.getByText(result.name).closest('a');
  //     expect(linkElement).toHaveAttribute('href', `/details/${result.uid}`);
  //   });
  // });

  // it('displays the correct names for each result', () => {
  //   render(
  //     <BrowserRouter>
  //       <SearchResults results={mockResults} />
  //     </BrowserRouter>,
  //   );

  //   mockResults.forEach((result) => {
  //     const nameElement = screen.getByText(result.name);
  //     expect(nameElement).toBeVisible();
  //   });
  // });

  it('displays a message if there are no search results', () => {
    render(
      <BrowserRouter>
        <SearchResults results={[]} />
      </BrowserRouter>,
    );

    const noResultsMessage = screen.getByText(/No/i);
    expect(noResultsMessage).toBeVisible();
  });
});
