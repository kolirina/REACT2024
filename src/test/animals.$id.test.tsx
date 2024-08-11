import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AnimalDetails from '../routes/animals.$id';
import { useLoaderData } from '@remix-run/react';
import { useTheme } from '../hooks/useTheme';
import { LoaderData } from '../types';

vi.mock('@remix-run/react', () => {
  return {
    useLoaderData: vi.fn(),
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
    Outlet: () => <div>Outlet</div>,
  };
});

vi.mock('../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockUseLoaderData = useLoaderData as unknown as ReturnType<typeof vi.fn>;
const mockUseTheme = useTheme as unknown as ReturnType<typeof vi.fn>;

describe('AnimalDetails Component', () => {
  beforeEach(() => {
    mockUseLoaderData.mockClear();
    mockUseTheme.mockClear();
  });

  it('should display animal details with descriptions if data is loaded', () => {
    const mockData: LoaderData = {
      data: {
        animal: {
          uid: 'ANA2',
          name: 'Elephant',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
    };

    mockUseLoaderData.mockReturnValue(mockData);
    mockUseTheme.mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/animals/1']}>
        <Routes>
          <Route path="/animals/:id" element={<AnimalDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Elephant')).toBeInTheDocument();
    expect(screen.getByText('Earth Animal 🐾')).toBeInTheDocument();
  });

  it('should display "an infinitely cute animal 👻" if no other descriptions are present', () => {
    const mockData: LoaderData = {
      data: {
        animal: {
          uid: 'ANA2',
          name: 'Unknown',
          earthAnimal: false,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
    };

    mockUseLoaderData.mockReturnValue(mockData);
    mockUseTheme.mockReturnValue(false);

    render(
      <MemoryRouter initialEntries={['/animals/1']}>
        <Routes>
          <Route path="/animals/:id" element={<AnimalDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(
      screen.getByText('an infinitely cute animal 👻'),
    ).toBeInTheDocument();
  });

  it('should display "No details available" if no data is loaded', () => {
    mockUseLoaderData.mockReturnValue({ data: null });
    mockUseTheme.mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={['/animals/1']}>
        <Routes>
          <Route path="/animals/:id" element={<AnimalDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('No details available')).toBeInTheDocument();
  });
});
