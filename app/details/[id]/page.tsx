'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  fetchAnimalDetails,
  fetchAnimalData,
} from '../../../src/services/fetchAnimalData';
import { Animal } from '../../../src/types';
import AnimalDetails from '../../../src/components/AnimalDetails';
import Search from '../../../src/components/Search';
import SearchResults from '../../../src/components/SearchResults';
import Pagination from '../../../src/components/Pagination';
import { useTheme, useThemeUpdate } from '../../../src/hooks/useTheme';
import Flyout from '../../../src/components/Flyout';
import { useSelector } from 'react-redux';
import { RootState } from '../../../src/store';

const AnimalDetailPage = () => {
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [paginationTotalPages, setPaginationTotalPages] = useState<number>(0);
  const [clickedAnimal, setClickedAnimal] = useState<Animal | null>(null);

  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAnimals = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const { id } = useParams();

  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') as string, 10) || 1;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSearchTerm = localStorage.getItem('searchTerm') || '';
      setCurrentSearchTerm(savedSearchTerm);
    }
  }, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      setLoading(true);
      try {
        const { initialAnimals, totalPages } = await fetchAnimalData(
          searchTerm,
          page,
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
  }, [searchTerm, page]);

  useEffect(() => {
    const fetchClickedAnimal = async () => {
      if (id) {
        try {
          const fetchedAnimal = await fetchAnimalDetails(id.toString());
          setClickedAnimal(fetchedAnimal);
        } catch (error) {
          console.error('Failed to fetch animal details:', error);
        }
      }
    };

    fetchClickedAnimal();
  }, [id]);

  const handleSearch = (term: string) => {
    setCurrentSearchTerm(term);
    localStorage.setItem('searchTerm', term);
    router.push(`/details/${id}?search=${term}&page=1`);
  };

  const handleAnimalDetailSelect = (animal: Animal) => {
    router.push(
      `/details/${animal.uid}?search=${currentSearchTerm}&page=${page}`,
    );
  };

  const handleHideDetails = () => {
    router.push(`/?search=${currentSearchTerm}&page=${page}`);
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
                    currentPage={page}
                    totalPages={paginationTotalPages}
                  />
                </div>
              </>
            )}
          </div>
          <div className="right-section" style={{ flex: 1 }}>
            {clickedAnimal ? (
              <AnimalDetails
                animal={clickedAnimal}
                onHideDetails={handleHideDetails}
              />
            ) : (
              <p>No animal details available.</p>
            )}
          </div>
          {Array.isArray(selectedAnimals) && selectedAnimals.length > 0 && (
            <Flyout />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
