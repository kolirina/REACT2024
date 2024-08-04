import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import {
  useSearchAnimalsQuery,
  useGetAnimalDetailsQuery,
} from '../src/services/apiSlice';
import { RootState } from '../src/store';
import { setPage, setTotalPages } from '../src/slices/paginationSlice';
import Search from '../src/components/Search';
import SearchResults from '../src/components/SearchResults';
import Pagination from '../src/components/Pagination';
import Flyout from '../src/components/Flyout';
import AnimalDetails from '../src/components/AnimalDetails';
import { Animal } from '../src/types';

const Home = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const dispatch = useDispatch();
  const router = useRouter();

  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const selectedAnimals = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const { page, id } = router.query;
  const currentPage = parseInt(page as string, 10) || 1;

  const { data: searchData } = useSearchAnimalsQuery({
    searchTerm: currentSearchTerm,
    pageNumber: currentPage - 1,
    pageSize: 15,
  });

  const { data: animalDetailsData } = useGetAnimalDetailsQuery(id as string, {
    skip: !id,
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

  useEffect(() => {
    if (animalDetailsData) {
      setSelectedAnimal(animalDetailsData.animal);
    } else {
      setSelectedAnimal(null);
    }
  }, [animalDetailsData]);

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    router.push(`/?search=${term}&page=1`, undefined, { shallow: true });
  };

  const handleAnimalDetailSelect = (animal: Animal) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, id: animal.uid },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleHideDetails = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: restQuery,
      },
      undefined,
      { shallow: true },
    );
    setSelectedAnimal(null);
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
            {searchData ? (
              <>
                <SearchResults
                  results={searchData.animals}
                  onAnimalDetailSelect={handleAnimalDetailSelect}
                />
                <div className="pagination">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={searchData.page.totalPages}
                  />
                </div>
              </>
            ) : (
              <div className="loader-container">
                <div className="loader">Loading</div>
              </div>
            )}
          </div>
          <div className="right-section" style={{ flex: 1 }}>
            {id && selectedAnimal && (
              <AnimalDetails
                animal={selectedAnimal}
                onHideDetails={handleHideDetails}
              />
            )}
          </div>
        </div>
        {selectedAnimals.length > 0 && <Flyout />}
      </div>
    </div>
  );
};

export default Home;
