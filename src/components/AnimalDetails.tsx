import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetAnimalDetailsQuery } from '../services/apiSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import '../App.css';
import { useTheme } from '../hooks/useTheme';
import { useSearchParams } from 'react-router-dom';

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useGetAnimalDetailsQuery(id!);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const darkTheme = useTheme();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  useEffect(() => {
    if (data) {
      const newDescriptions: string[] = [];
      if (data.animal.earthAnimal) newDescriptions.push('Earth Animal 🐾');
      if (data.animal.earthInsect) newDescriptions.push('Earth Insect 🦗');
      if (data.animal.avian) newDescriptions.push('Avian 🦜');
      if (data.animal.canine) newDescriptions.push('Canine 🐶');
      if (data.animal.feline) newDescriptions.push('Feline 😺');

      if (newDescriptions.length === 0) {
        newDescriptions.push('an infinitely cute animal 👻');
      }

      setDescriptions(newDescriptions);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading animal details</div>;

  return (
    <div className="animal-details">
      {data ? (
        <div>
          <h2>{data.animal.name}</h2>
          <p>{descriptions.join(', ')}</p>
          <Link
            to={`/?search=${searchTerm}&page=${currentPage}`}
            className={darkTheme ? 'dark-link' : 'light-link'}
          >
            Hide Details
          </Link>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default AnimalDetails;
