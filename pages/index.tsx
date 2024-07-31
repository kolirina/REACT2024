import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchAnimalsQuery } from '../src/services/apiSlice';
import { RootState } from '../src/store';
import { setPage, setTotalPages } from '../src/slices/paginationSlice';
import Search from '../src/components/Search';
import SearchResults from '../src/components/SearchResults';
import Pagination from '../src/components/Pagination';
import Flyout from '../src/components/Flyout';

const Home = () => {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [isErrBtnClicked, setIsErrBtnClicked] = useState(false);
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
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const router = useRouter();
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const pageParam = (router.query.page as string) || '1';

  useEffect(() => {
    // Этот код выполняется только на клиенте
    const savedSearchTerm = localStorage.getItem('searchTerm');
    setCurrentSearchTerm(savedSearchTerm || '');
  }, []);

  useEffect(() => {
    const pageNumber = parseInt(pageParam, 10);
    dispatch(setPage(pageNumber));
  }, [pageParam, dispatch]);

  const { data } = useSearchAnimalsQuery({
    searchTerm: currentSearchTerm,
    pageNumber: currentPage - 1,
    pageSize: 15,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(data.page.totalPages));
    }
  }, [data, dispatch]);

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    router.push(`/?search=${term}&page=1`);
    dispatch(setPage(1));
  };

  const handleErrorButtonClick = () => {
    setIsErrBtnClicked(true);
  };

  if (isErrBtnClicked) {
    throw new Error('Test Error');
  }

  return (
    <div className={darkTheme ? 'dark-MainWrapper' : 'light-MainWrapper'}>
      <button onClick={toggleTheme} className="themeButton">
        {darkTheme ? '🌞 Light Mode' : '🌜 Dark Mode'}
      </button>
      <div data-testid="home" className={darkTheme ? 'dark-App' : 'light-App'}>
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
          <div className="right-section"></div>
        </div>
        <button className="error-button" onClick={handleErrorButtonClick}>
          Throw Error
        </button>
      </div>
      {selectedItems.length > 0 && <Flyout />}
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from 'react';
// import { useTheme, useThemeUpdate } from '../src/hooks/useTheme';
// import { useSelector, useDispatch } from 'react-redux';
// import { useSearchAnimalsQuery } from '../src/services/apiSlice';
// import { RootState } from '../src/store';
// import { setPage, setTotalPages } from '../src/slices/paginationSlice';
// import Search from '../src/components/Search';
// import SearchResults from '../src/components/SearchResults';
// import Pagination from '../src/components/Pagination';
// import Flyout from '../src/components/Flyout';
// import { useRouter } from 'next/router';

// const Home = () => {
//   const darkTheme = useTheme();
//   const toggleTheme = useThemeUpdate();
//   const [isErrBtnClicked, setIsErrBtnClicked] = useState(false);
//   const dispatch = useDispatch();
//   const selectedItems = useSelector(
//     (state: RootState) => state.selectedItems.items,
//   );
//   const currentPage = useSelector(
//     (state: RootState) => state.pagination.currentPage,
//   );
//   const totalPages = useSelector(
//     (state: RootState) => state.pagination.totalPages,
//   );
//   const isLoading = useSelector((state: RootState) => state.loading.isLoading);

//   const router = useRouter();
//   const currentSearchTerm = localStorage.getItem('searchTerm') || '';
//   const { page } = router.query;
//   const pageParam = page || '1';

//   useEffect(() => {
//     const pageNumber = parseInt(pageParam as string, 10);
//     dispatch(setPage(pageNumber));
//   }, [pageParam, dispatch]);

//   const { data } = useSearchAnimalsQuery({
//     searchTerm: currentSearchTerm,
//     pageNumber: currentPage - 1,
//     pageSize: 15,
//   });

//   useEffect(() => {
//     if (data) {
//       dispatch(setTotalPages(data.page.totalPages));
//     }
//   }, [data, dispatch]);

//   const handleSearch = (term: string) => {
//     router.push(`/?search=${term}&page=1`);
//     dispatch(setPage(1));
//   };

//   const handleErrorButtonClick = () => {
//     setIsErrBtnClicked(true);
//   };

//   if (isErrBtnClicked) {
//     throw new Error('Test Error');
//   }

//   return (
//     <div className={darkTheme ? 'dark-MainWrapper' : 'light-MainWrapper'}>
//       <button onClick={toggleTheme} className="themeButton">
//         {darkTheme ? '🌞 Light Mode' : '🌜 Dark Mode'}
//       </button>
//       <div data-testid="home" className={darkTheme ? 'dark-App' : 'light-App'}>
//         <div className="top-section">
//           <Search onSearch={handleSearch} />
//         </div>
//         <div className="content-section">
//           <div className="left-section">
//             {isLoading ? (
//               <div className="loader-container">
//                 <div className="loader">Loading</div>
//               </div>
//             ) : (
//               data && <SearchResults results={data.animals} />
//             )}
//             <div className="pagination">
//               <Pagination currentPage={currentPage} totalPages={totalPages} />
//             </div>
//           </div>
//           <div className="right-section">
//             {/* Replace Outlet with a dynamic import or component */}
//             {/* You can import a specific component or use a placeholder */}
//           </div>
//         </div>
//         <button className="error-button" onClick={handleErrorButtonClick}>
//           Throw Error
//         </button>
//       </div>
//       {selectedItems.length > 0 && <Flyout />}
//     </div>
//   );
// };

// export default Home;
