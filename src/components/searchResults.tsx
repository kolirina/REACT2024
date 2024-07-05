import { Component } from 'react';

interface SearchResult {
  name: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    return (
      <div className="search-results">
        {/* <h2>Search Results</h2>
        <ul>
          {this.props.results.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong>: {result.description}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default SearchResults;
