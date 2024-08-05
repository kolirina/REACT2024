import { useTheme } from '../hooks/useTheme';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const { search } = router.query;
  const searchTerm = search || '';
  const darkTheme = useTheme();

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          href={`/?search=${searchTerm}&page=${currentPage - 1}`}
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
          href={`/?search=${searchTerm}&page=${currentPage + 1}`}
          className={darkTheme ? 'dark-link' : 'light-link'}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
