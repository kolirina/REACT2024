import { Component } from 'react';

interface AnimalInfo {
  uid: string;
  name: string;
  descriptions: string[];
}

interface SearchResultsProps {
  results: AnimalInfo[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    return (
      <div className="search-results">
        <h2>Search Results</h2>
        <ul>
          {this.props.results.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong>: {result.name} is{' '}
              {result.descriptions.join(' and ')}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
