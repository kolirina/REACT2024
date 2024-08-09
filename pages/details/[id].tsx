import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {
  fetchAnimalDetails,
  fetchAnimalData,
} from '../../src/services/fetchAnimalData';
import { Animal, HomePageProps } from '../../src/types';
import AnimalDetails from '../../src/components/AnimalDetails';
import Search from '../../src/components/Search';
import SearchResults from '../../src/components/SearchResults';
import Pagination from '../../src/components/Pagination';
import { useTheme, useThemeUpdate } from '../../src/hooks/useTheme';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import Flyout from '../../src/components/Flyout';

interface AnimalDetailsPageProps extends HomePageProps {
  initialSearchTerm: string;
  initialPage: number;
  initialAnimals: Animal[];
  totalPages: number;
  initialClickedAnimal: Animal;
}

const AnimalDetailsPage: NextPage<AnimalDetailsPageProps> = ({
  initialSearchTerm,
  initialPage,
  initialAnimals,
  totalPages,
  initialClickedAnimal,
}) => {
  const [currentSearchTerm, setCurrentSearchTerm] =
    useState<string>(initialSearchTerm);
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationTotalPages, setPaginationTotalPages] =
    useState<number>(totalPages);
  const [clickedAnimal, setClickedAnimal] =
    useState<Animal>(initialClickedAnimal);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const router = useRouter();

  const selectedAnimals = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const { initialAnimals, totalPages } = await fetchAnimalData(
          currentSearchTerm,
          initialPage,
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
  }, [currentSearchTerm, initialPage]);

  useEffect(() => {
    const fetchClickedAnimal = async () => {
      const { id } = router.query;
      if (id) {
        try {
          const fetchedAnimal = await fetchAnimalDetails(id as string);
          setClickedAnimal(fetchedAnimal);
        } catch (error) {
          console.error('Failed to fetch animal details:', error);
        }
      }
    };

    fetchClickedAnimal();
  }, [router.query, router.query.id]);

  const handleSearch = (term: string) => {
    setCurrentSearchTerm(term);
    router.push(
      `/details/${clickedAnimal.uid}?search=${term}&page=1`,
      undefined,
      { shallow: true },
    );
  };

  const handleAnimalDetailSelect = (animal: Animal) => {
    router.push(
      `/details/${animal.uid}?search=${currentSearchTerm}&page=${initialPage}`,
      undefined,
      { shallow: true },
    );
  };

  const handleHideDetails = () => {
    router.push(
      {
        pathname: '/',
        query: { search: currentSearchTerm, page: initialPage },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className={darkTheme ? 'dark-MainWrapper' : 'light-MainWrapper'}>
      <button onClick={toggleTheme} className="themeButton">
        {darkTheme ? '🌞 Light Mode' : '🌜 Dark Mode'}
      </button>
      <div className={darkTheme ? 'dark-App' : 'light-App'}>
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
                    currentPage={initialPage}
                    totalPages={paginationTotalPages}
                  />
                </div>
              </>
            )}
          </div>
          <div className="right-section" style={{ flex: 1 }}>
            <AnimalDetails
              animal={clickedAnimal}
              onHideDetails={handleHideDetails}
            />
          </div>
          {Array.isArray(selectedAnimals) && selectedAnimals.length > 0 && (
            <Flyout />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, search = '', page = '1' } = context.query;

  try {
    const clickedAnimal = await fetchAnimalDetails(id as string);
    const { initialSearchTerm, initialPage, initialAnimals, totalPages } =
      await fetchAnimalData(search as string, parseInt(page as string, 10));

    return {
      props: {
        initialSearchTerm,
        initialPage,
        initialAnimals,
        totalPages,
        initialClickedAnimal: clickedAnimal,
      },
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return {
      notFound: true,
    };
  }
};
