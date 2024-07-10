import React from 'react';

interface AnimalInfo {
  uid: string;
  name: string;
  descriptions: string[];
}

interface SearchResultsProps {
  results: AnimalInfo[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <strong>{result.name}</strong>: {result.descriptions.join(' and ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
