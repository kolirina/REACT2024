import React from 'react';
import Link from 'next/link';
import Checkbox from './Checkbox';
import { Animal } from '../types';
import { useTheme } from '../hooks/useTheme';
// import '../App.css';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface SearchResultsProps {
  results: Animal[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const router = useRouter();
  const { search } = router.query;
  const searchTerm = search || '';
  const darkTheme = useTheme();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.uid}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox item={result} />
                <Link
                  href={`/details/${result.uid}?search=${searchTerm}&page=${currentPage}`}
                  className={darkTheme ? 'dark-animalLink' : 'light-animalLink'}
                >
                  <strong>{result.name}</strong>
                </Link>
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
