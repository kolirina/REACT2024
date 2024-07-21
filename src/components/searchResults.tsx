import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
import { Animal } from '../types';
import { useTheme } from '../hooks/useTheme';
import '../App.css';

interface SearchResultsProps {
  results: Animal[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const darkTheme = useTheme();
  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.uid}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox item={result} />
                <Link
                  to={`/details/${result.uid}`}
                  className={darkTheme ? 'dark-animalLink' : 'light-animalLink'}
                >
                  <strong>{result.name}</strong>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No animal found. Try again😸</div>
      )}
    </div>
  );
};

export default SearchResults;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Checkbox from './Checkbox';

// interface AnimalInfo {
//   uid: string;
//   name: string;
//   descriptions?: string[];
// }

// interface SearchResultsProps {
//   results: AnimalInfo[];
// }

// const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
//   return (
//     <div className="search-results">
//       <h2>Search Results</h2>
//       {results.length > 0 ? (
//         <ul>
//           {results.map((result, index) => (
//             <li key={index}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Checkbox
//                   item={{
//                     uid: result.uid,
//                     name: result.name,
//                     description: result.descriptions?.join(', ') || '',
//                   }}
//                 />
//                 <Link to={`/details/${result.uid}`} className="animalLink">
//                   <strong>{result.name}</strong>
//                 </Link>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No animal found. Try again😸</div>
//       )}
//     </div>
//   );
// };

// export default SearchResults;
