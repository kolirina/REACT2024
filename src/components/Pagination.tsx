import React from 'react';
import { Link } from 'react-router-dom';
import '../paginationStyles.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`?page=${currentPage - 1}`} className="pagination-link">
          Previous
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link to={`?page=${currentPage + 1}`} className="pagination-link">
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
