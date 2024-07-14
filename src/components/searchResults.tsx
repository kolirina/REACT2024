import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AnimalInfo {
  uid: string;
  name: string;
  descriptions?: string[];
}

interface SearchResultsProps {
  results: AnimalInfo[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const location = useLocation();

  const createLink = (id: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('details', id);
    return `/details/${id}`;
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <Link to={createLink(result.uid)} className="animalLink">
              <strong>{result.name}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
