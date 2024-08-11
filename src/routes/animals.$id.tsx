import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from '@remix-run/react';
import { useTheme } from '../hooks/useTheme';
import { LoaderData } from '../types';

import { animalLoader } from '../../loaders/animalLoader';

export const loader = animalLoader;
export default function AnimalDetails() {
  const { data } = useLoaderData<LoaderData>();
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const darkTheme = useTheme();

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

  return (
    <div className="animal-details">
      {data ? (
        <div>
          <h2>{data.animal.name}</h2>
          <p>{descriptions.join(', ')}</p>
          <Link to={`/`} className={darkTheme ? 'dark-link' : 'light-link'}>
            Hide Details
          </Link>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
}
