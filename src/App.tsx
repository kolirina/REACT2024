import { Component } from 'react';
import './App.css';
import Search from './components/search';
import SearchResults from './components/searchResults';

interface AppState {
  results: AnimalInfo[];
  isLoading: boolean;
  hasError: boolean;
  isErrBtnClicked: boolean;
}

interface AnimalInfo {
  uid: string;
  name: string;
  descriptions: string[];
}

interface Animal {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      hasError: false,
      isErrBtnClicked: false,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.handleSearch(savedSearchTerm);
  }

  handleSearch = async (searchTerm: string) => {
    this.setState({ isLoading: true });

    const pageNumber = 0;
    const pageSize = 15;

    const apiEndpoint = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}&title=${searchTerm}&name=${searchTerm}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const results = data.animals.map((animal: Animal) => {
        const descriptions: string[] = [];
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

      this.setState({ results, isLoading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ isLoading: false });
    }
  };

  handleErrorButtonClick = () => {
    this.setState({ isErrBtnClicked: true });
  };

  render() {
    if (this.state.isErrBtnClicked) {
      throw new Error('Test Error');
    }
    return (
      <div className="App">
        <div className="top-section">
          <Search onSearch={this.handleSearch} />
        </div>
        <div className="bottom-section">
          {this.state.isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {this.state.results.length > 0 ? (
                <SearchResults results={this.state.results} />
              ) : (
                <div className="nothing-found">
                  No animal found. Try again😸
                </div>
              )}
            </>
          )}
        </div>
        <button className="error-button" onClick={this.handleErrorButtonClick}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
