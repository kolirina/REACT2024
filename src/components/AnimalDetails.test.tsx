// import { render, screen } from '@testing-library/react';
// import AnimalDetails from './AnimalDetails';

// it('should have search results', () => {
//   render(<AnimalDetails />);
//   const title = screen.queryByText(/Not Found/i);
//   expect(title).toBeVisible();
// });

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AnimalDetails from './AnimalDetails';
import { getAnimalDetails } from '../services/api';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useParams: () => ({ id: '1' }), // mock useParams to return an id
    useOutletContext: () => ({ setShowingAnimalDetails: vi.fn() }), // mock useOutletContext
  };
});

vi.mock('../services/api', () => ({
  getAnimalDetails: vi.fn(),
}));

describe('AnimalDetails Component', () => {
  it('displays a loading indicator while fetching data', async () => {
    vi.mocked(getAnimalDetails).mockImplementationOnce(
      () => new Promise(() => {}), // Keep promise pending
    );

    render(
      <BrowserRouter>
        <AnimalDetails />
      </BrowserRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeVisible();
  });

  it('displays animal details after fetching data', async () => {
    vi.mocked(getAnimalDetails).mockResolvedValueOnce({
      animal: {
        uid: '1',
        name: 'Tiger',
        earthAnimal: true,
      },
    });

    render(
      <BrowserRouter>
        <AnimalDetails />
      </BrowserRouter>,
    );

    expect(await screen.findByText('Tiger')).toBeVisible();
    expect(await screen.findByText('Earth Animal 🐾')).toBeVisible();
  });

  it('displays "No animal details found" if no data is returned', async () => {
    vi.mocked(getAnimalDetails).mockResolvedValueOnce({
      animal: null,
    });

    render(
      <BrowserRouter>
        <AnimalDetails />
      </BrowserRouter>,
    );

    expect(await screen.findByText('No animal details found.')).toBeVisible();
  });
});
