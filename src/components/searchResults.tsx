import React from 'react';
import Checkbox from './Checkbox';
import { Animal } from '../types';
import { useTheme } from '../hooks/useTheme';

interface SearchResultsProps {
  results: Animal[];
  onAnimalDetailSelect: (animal: Animal) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onAnimalDetailSelect,
}) => {
  const darkTheme = useTheme();

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.uid}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox item={result} />{' '}
                <button
                  onClick={() => onAnimalDetailSelect(result)}
                  className={darkTheme ? 'dark-animalLink' : 'light-animalLink'}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'inherit',
                    textDecoration: 'underline',
                  }}
                >
                  <strong>{result.name}</strong>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No animal found. Try again😸</div>
      )}
    </div>
  );
};

export default SearchResults;
