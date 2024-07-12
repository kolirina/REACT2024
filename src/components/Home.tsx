import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import Search from './search';
import SearchResults from './searchResults';
import { searchAnimals } from '../services/api';
import ErrorBoundary from './ErrorBoundary';
import Pagination from './Pagination';

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
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrBtnClicked, setIsErrBtnClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const { page } = useParams<{ page?: string }>();

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
        navigate(`/search/${newPage}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const pageNumber = page ? parseInt(page, 10) : 1;
    setCurrentPage(pageNumber);
    handleSearch(savedSearchTerm, pageNumber);
  }, [page, handleSearch]);

  const handlePageChange = (newPage: number) => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    handleSearch(savedSearchTerm, newPage);
  };

  const handleErrorButtonClick = () => {
    setIsErrBtnClicked(true);
  };

  if (isErrBtnClicked) {
    throw new Error('Test Error');
  }

  return (
    <ErrorBoundary>
      <div className="App">
        <div className="top-section">
          <Search onSearch={handleSearch} currentPage={currentPage} />
        </div>
        <div className="bottom-section">
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
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
        </div>
        <button className="error-button" onClick={handleErrorButtonClick}>
          Throw Error
        </button>
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
