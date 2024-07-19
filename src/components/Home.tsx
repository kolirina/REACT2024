import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Outlet, useNavigate } from 'react-router-dom';
import '../App.css';
import Search from './search';
import SearchResults from './searchResults';
import { searchAnimals } from '../services/api';
import ErrorBoundary from './ErrorBoundary';
import Pagination from './Pagination';
import Flyout from './Flyout';

interface Animal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

const Home = () => {
  const [results, setResults] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrBtnClicked, setIsErrBtnClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showingAnimalDetails, setShowingAnimalDetails] = useState(false);

  const handleSearch = useCallback(
    async (searchTerm: string, page: number = 1) => {
      setIsLoading(true);

      try {
        const data = await searchAnimals(searchTerm, page - 1);
        const newPage = data.page.pageNumber + 1;
        const totalPages = data.page.totalPages;
        const results = data.animals.map((animal: Animal) => {
          const descriptions = [];
          if (animal.earthAnimal) descriptions.push('Earth Animal 🐾');
          if (animal.earthInsect) descriptions.push('Earth Insect 🦗');
          if (animal.avian) descriptions.push('Avian 🦜');
          if (animal.canine) descriptions.push('Canine 🐶');
          if (animal.feline) descriptions.push('Feline 😺');
          if (descriptions.length === 0) {
            descriptions.push('an infinitely cute animal 👻');
          }

          return {
            uid: animal.uid,
            name: animal.name,
            descriptions,
          };
        });

        setResults(results);
        setCurrentPage(newPage);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const pageNumber = parseInt(searchParams.get('page') || '1', 10);

    if (savedSearchTerm !== currentSearchTerm || !currentSearchTerm) {
      setCurrentSearchTerm(savedSearchTerm);
      setCurrentPage(1);
      handleSearch(savedSearchTerm, 1);
    } else if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      handleSearch(savedSearchTerm, pageNumber);
    }
  }, [searchParams, currentSearchTerm, currentPage, handleSearch]);

  const handleErrorButtonClick = () => {
    setIsErrBtnClicked(true);
  };

  if (isErrBtnClicked) {
    throw new Error('Test Error');
  }

  const handleLeftSectionClick = () => {
    if (showingAnimalDetails) {
      navigate('/');
      setShowingAnimalDetails(false);
    }
  };

  return (
    <ErrorBoundary>
      <div data-testid="home" className="App">
        <div className="top-section">
          <Search
            onSearch={(term) => setSearchParams({ search: term, page: '1' })}
          />
        </div>
        <div className="content-section">
          <div className="left-section" onClick={handleLeftSectionClick}>
            {isLoading ? (
              <div className="loader-container">
                <div className="loader">Loading</div>
              </div>
            ) : (
              <>
                {results.length > 0 ? (
                  <SearchResults results={results} />
                ) : (
                  <div className="nothing-found">
                    No animal found. Try again😸
                  </div>
                )}
              </>
            )}
            <div className="pagination">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          </div>
          <Flyout />
          <div className="right-section">
            <Outlet context={{ setShowingAnimalDetails }} />
          </div>
        </div>
        <button className="error-button" onClick={handleErrorButtonClick}>
          Throw Error
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
