'use client';

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const darkTheme = useTheme();

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          to={`?search=${searchTerm}&page=${currentPage - 1}`}
          className={darkTheme ? 'dark-link' : 'light-link'}
        >
          Previous
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          to={`?search=${searchTerm}&page=${currentPage + 1}`}
          className={darkTheme ? 'dark-link' : 'light-link'}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
