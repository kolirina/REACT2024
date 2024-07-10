import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search';
import SearchResults from './components/searchResults';
import { searchAnimals } from './services/api';
import ErrorBoundary from './components/ErrorBoundary';
// import useSearchTerm from './hooks/useSearchTerm';

// interface AppState {
//   results: AnimalInfo[];
//   isLoading: boolean;
//   hasError: boolean;
//   isErrBtnClicked: boolean;
// }

// interface AnimalInfo {
//   uid: string;
//   name: string;
//   descriptions: string[];
// }

interface Animal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

const App = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrBtnClicked, setIsErrBtnClicked] = useState(false);
  // const [searchTerm, setSearchTerm] = useSearchTerm();

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);

    try {
      const data = await searchAnimals(searchTerm);
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

  const handleErrorButtonClick = () => {
    setIsErrBtnClicked(true);
  };

  const handleRestartClick = () => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    handleSearch(savedSearchTerm);
  };

  if (isErrBtnClicked) {
    throw new Error('Test Error');
  }

  return (
    <ErrorBoundary onRestart={handleRestartClick}>
      <div className="App">
        <div className="top-section">
          <Search onSearch={handleSearch} />
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
      </div>
    </ErrorBoundary>
  );
};

export default App;
