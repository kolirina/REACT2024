import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
import { RootState } from '../src/store';
import Search from '../src/components/Search';
import SearchResults from '../src/components/SearchResults';
import Pagination from '../src/components/Pagination';
import Flyout from '../src/components/Flyout';
import { Animal, HomePageProps } from '../src/types';
import { getServerSideProps } from '../src/server/getServerSideProps';
import { fetchAnimalData } from '../src/services/fetchAnimalData';

const Home: NextPage<HomePageProps> = ({
  initialSearchTerm,
  initialPage,
  initialAnimals,
  totalPages,
}) => {
  const [currentSearchTerm, setCurrentSearchTerm] =
    useState<string>(initialSearchTerm);
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationTotalPages, setPaginationTotalPages] =
    useState<number>(totalPages);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const dispatch = useDispatch();
  const router = useRouter();

  const selectedAnimals = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const { page } = router.query;
  const currentPage = parseInt(page as string, 10) || initialPage;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearchTerm =
        localStorage.getItem('searchTerm') || initialSearchTerm || '';
      setCurrentSearchTerm(savedSearchTerm);
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const { initialAnimals, totalPages } = await fetchAnimalData(
          currentSearchTerm,
          currentPage,
        );
        setAnimals(initialAnimals);
        setPaginationTotalPages(totalPages);
      } catch (error) {
        console.error('Failed to fetch animals:', error);
        setAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, [currentSearchTerm, currentPage, dispatch]);

  const handleSearch = (term: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', term);
    }
    setCurrentSearchTerm(term);
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
            {loading ? (
              <div className="loader-container">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              <>
                {animals ? (
                  <SearchResults
                    results={animals}
                    onAnimalDetailSelect={handleAnimalDetailSelect}
                  />
                ) : (
                  <p>No animals found.</p>
                )}
                <div className="pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={paginationTotalPages}
                  />
                </div>
              </>
            )}
          </div>
          <div className="right-section" style={{ flex: 1 }}>
            {Array.isArray(selectedAnimals) && selectedAnimals.length > 0 && (
              <Flyout />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// eslint-disable-next-line react-refresh/only-export-components
export { getServerSideProps };
