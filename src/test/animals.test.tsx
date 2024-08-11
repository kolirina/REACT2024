import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from '../routes/animals';
import { useLoaderData } from '@remix-run/react';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';

vi.mock('@remix-run/react', () => ({
  ...vi.importActual('@remix-run/react'),
  useLoaderData: vi.fn(),
  Outlet: () => <div>Outlet Content</div>,
  useNavigate: vi.fn(),
}));

const mockStore = configureStore([]);
const initialAnimals = [
  { id: 1, name: 'Lion' },
  { id: 2, name: 'Tiger' },
];
const initialLoaderData = {
  animals: initialAnimals,
  searchTerm: '',
  page: 1,
  totalPages: 2,
};

describe('Index Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      pagination: { currentPage: 1, totalPages: 2 },
      selectedItems: { items: [] },
    });

    (useLoaderData as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      initialLoaderData,
    );
  });

  it('should render the search results correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('home')).toBeInTheDocument();
    expect(screen.getByText('Lion')).toBeInTheDocument();
    expect(screen.getByText('Tiger')).toBeInTheDocument();
    expect(screen.getByText('🌜 Dark Mode')).toBeInTheDocument();
  });
});
