import React, { useState, useEffect } from 'react';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, defaultValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  useEffect(() => {
    setSearchTerm(defaultValue);
  }, [defaultValue]);

  const handleSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim();
    setSearchTerm(trimmedSearchTerm);
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="top-section">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Find an Animal 🔍"
      />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default Search;
