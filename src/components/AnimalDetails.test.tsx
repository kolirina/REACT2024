import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AnimalDetails from './AnimalDetails';
import { getAnimalDetails } from '../services/api';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as {
    [key: string]: unknown;
  };

  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter as React.ComponentType,
    useParams: () => ({ id: '1' }),
    useOutletContext: () => ({ setShowingAnimalDetails: vi.fn() }),
  };
});

vi.mock('../services/api', () => ({
  getAnimalDetails: vi.fn(),
}));

describe('AnimalDetails Component', () => {
  it('displays a loading indicator while fetching data', () => {
    vi.mocked(getAnimalDetails).mockImplementationOnce(
      () => new Promise(() => {}),
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
