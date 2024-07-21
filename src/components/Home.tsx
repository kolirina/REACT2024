import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useSearchAnimalsQuery } from '../services/apiSlice';
import { RootState } from '../store';
import { setPage, setTotalPages } from '../slices/paginationSlice';
import Search from './search';
import SearchResults from './searchResults';
import Pagination from './Pagination';
import Flyout from './Flyout';
import '../App.css';

const Home = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchTerm = searchParams.get('search') || '';
  const pageParam = searchParams.get('page') || '1';

  React.useEffect(() => {
    const pageNumber = parseInt(pageParam, 10);
    dispatch(setPage(pageNumber));
  }, [pageParam, dispatch]);

  const { data, isLoading } = useSearchAnimalsQuery({
    searchTerm: currentSearchTerm,
    pageNumber: currentPage - 1,
    pageSize: 15,
  });

  React.useEffect(() => {
    if (data) {
      dispatch(setTotalPages(data.page.totalPages));
    }
  }, [data, dispatch]);

  const handleSearch = (term: string) => {
    setSearchParams({ search: term, page: '1' });
    dispatch(setPage(1));
  };

  return (
    <div data-testid="home" className="App">
      <div className="top-section">
        <Search onSearch={handleSearch} />
      </div>
      <div className="content-section">
        <div className="left-section">
          {isLoading ? (
            <div className="loader-container">
              <div className="loader">Loading</div>
            </div>
          ) : (
            data && <SearchResults results={data.animals} />
          )}
          <div className="pagination">
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
        <div className="right-section">
          <Outlet />
        </div>
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export default Home;
