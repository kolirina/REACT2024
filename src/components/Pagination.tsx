import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          to={`?search=${searchTerm}&page=${currentPage - 1}`}
          className="pagination-link"
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
          className="pagination-link"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
