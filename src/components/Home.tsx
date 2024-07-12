import { useState, useEffect } from 'react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (searchTerm: string, page: number = 0) => {
    setIsLoading(true);

    try {
      const data = await searchAnimals(searchTerm, page);
      const currentPage = data.page.pageNumber;
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
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    handleSearch(savedSearchTerm);
  }, []);

  const handlePageChange = (page: number) => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    handleSearch(savedSearchTerm, page);
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
