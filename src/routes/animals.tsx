import React, { useEffect, useState } from 'react';
import { useLoaderData, Outlet, useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useDispatch } from 'react-redux';
import { setPage, setTotalPages } from '../slices/paginationSlice';
import { useTheme, useThemeUpdate } from '../hooks/useTheme';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import { fetchAnimalData } from '../services/fetchAnimalData';
import { Animal } from '../types';

interface LoaderData {
  animals: Animal[];
  searchTerm: string;
  page: number;
  totalPages: number;
}

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  let searchTerm = url.searchParams.get('search') || '';
  if (typeof window !== 'undefined') {
    searchTerm = localStorage.getItem('searchTerm') || '';
  }

  const page = parseInt(url.searchParams.get('page') || '1', 10);

  const { initialAnimals, totalPages } = await fetchAnimalData(
    searchTerm,
    page,
  );

  return json({
    animals: initialAnimals,
    searchTerm,
    page,
    totalPages,
  });
};

export default function Index() {
  const { animals, searchTerm, page, totalPages } = useLoaderData<LoaderData>();
  const dispatch = useDispatch();
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    dispatch(setPage(page));
    dispatch(setTotalPages(totalPages));
  }, [page, totalPages, dispatch]);

  const handleSearch = (term: string) => {
    setIsLoading(true);
    navigate(`?search=${encodeURIComponent(term)}&page=1`);
  };

  return (
    <div className={darkTheme ? 'dark-MainWrapper' : 'light-MainWrapper'}>
      <button onClick={toggleTheme} className="themeButton">
        {darkTheme ? '🌞 Light Mode' : '🌜 Dark Mode'}
      </button>
      <div data-testid="home" className={darkTheme ? 'dark-App' : 'light-App'}>
        <div className="top-section">
          <Search onSearch={handleSearch} defaultValue={searchTerm} />
        </div>
        <div className="content-section">
          <div className="left-section">
            {isLoading ? (
              <div className="loader-container">
                <div className="loader">Loading...</div>
              </div>
            ) : animals.length > 0 ? (
              <SearchResults results={animals} />
            ) : (
              <div className="no-results">
                No animals found matching your search.
              </div>
            )}
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
          <div className="right-section">
            <Outlet />
          </div>
        </div>
        <Flyout />
      </div>
    </div>
  );
}
