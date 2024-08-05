import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchAnimalsQuery } from '../src/services/apiSlice';
import { RootState } from '../src/store';
import { setPage, setTotalPages } from '../src/slices/paginationSlice';
import Search from '../src/components/Search';
import SearchResults from '../src/components/SearchResults';
import Pagination from '../src/components/Pagination';
import Flyout from '../src/components/Flyout';
import { Animal } from '../src/types';

const Home = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const selectedAnimals = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const { page } = router.query;
  const currentPage = parseInt(page as string, 10) || 1;

  const { data: searchData, isLoading: searchLoading } = useSearchAnimalsQuery({
    searchTerm: currentSearchTerm,
    pageNumber: currentPage - 1,
    pageSize: 15,
  });

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setCurrentSearchTerm(savedSearchTerm);

    if (!router.query.search && savedSearchTerm) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, search: savedSearchTerm, page: '1' },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router]);

  useEffect(() => {
    const searchTerm = (router.query.search as string) || '';
    setCurrentSearchTerm(searchTerm);

    const pageNumber = parseInt(router.query.page as string, 10) || 1;
    dispatch(setPage(pageNumber));
  }, [router.query.search, router.query.page, dispatch]);

  useEffect(() => {
    if (searchData) {
      dispatch(setTotalPages(searchData.page.totalPages));
    }
  }, [searchData, dispatch]);

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    router.push(`/?search=${term}&page=1`, undefined, { shallow: true });
  };

  const handleAnimalDetailSelect = (animal: Animal) => {
    router.push(
      `/details/${animal.uid}?search=${currentSearchTerm}&page=${currentPage}`,
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className={darkTheme ? 'dark-MainWrapper' : 'light-MainWrapper'}>
      <button onClick={toggleTheme} className="themeButton">
        {darkTheme ? '🌞 Light Mode' : '🌜 Dark Mode'}
      </button>
      <div data-testid="home" className={darkTheme ? 'dark-App' : 'light-App'}>
        <div className="top-section">
          <Search onSearch={handleSearch} />
        </div>
        <div className="content-section" style={{ display: 'flex' }}>
          <div className="left-section" style={{ flex: 2 }}>
            {searchLoading ? (
              <div className="loader-container">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <>
                {searchData ? (
                  <SearchResults
                    results={searchData.animals}
                    onAnimalDetailSelect={handleAnimalDetailSelect}
                  />
                ) : (
                  <p>No animals found.</p>
                )}
                <div className="pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={searchData?.page.totalPages || 0}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {selectedAnimals.length > 0 && <Flyout />}
      </div>
    </div>
  );
};

export default Home;
