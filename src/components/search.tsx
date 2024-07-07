import React, { Component } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    const savedSearchTerm = localStorage.getItem('searchTerm') || '';

    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSubmit = () => {
    const searchTerm = this.state.searchTerm.trim();
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
    this.props.onSearch(searchTerm);
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    return (
      <div className="top-section">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Find an Animal 🔍"
        />
        <button onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
}

export default Search;
