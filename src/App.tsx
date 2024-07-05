import { Component } from 'react';
import './App.css';
import Search from './components/search';
import SearchResults from './components/searchResults';

interface AppState {
  results: SearchResult[];
}

interface SearchResult {
  name: string;
  description: string;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
    };
  }

  handleSearch = async (searchTerm: string) => {
    const apiEndpoint = 'https://stapi.co/api/v1/rest/animal/search';
    const requestData = new URLSearchParams();
    requestData.append('pageNumber', '0');
    requestData.append('pageSize', '20');
    requestData.append('title', searchTerm);
    requestData.append('name', searchTerm);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: requestData.toString(),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Search results:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  render() {
    return (
      <div className="App">
        <div className="top-section">
          <Search onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section">
          <SearchResults results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
