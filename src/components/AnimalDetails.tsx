'use client';

import React, { useEffect, useState } from 'react';
import { Animal } from '../types';
import { useTheme } from '../hooks/useTheme';

interface AnimalDetailsProps {
  animal: Animal;
  onHideDetails: () => void;
}

const AnimalDetails: React.FC<AnimalDetailsProps> = ({
  animal,
  onHideDetails,
}) => {
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const darkTheme = useTheme();

  useEffect(() => {
    const newDescriptions: string[] = [];
    if (animal.earthAnimal) newDescriptions.push('Earth Animal 🐾');
    if (animal.earthInsect) newDescriptions.push('Earth Insect 🦗');
    if (animal.avian) newDescriptions.push('Avian 🦜');
    if (animal.canine) newDescriptions.push('Canine 🐶');
    if (animal.feline) newDescriptions.push('Feline 😺');

    if (newDescriptions.length === 0) {
      newDescriptions.push('an infinitely cute animal 👻');
    }

    setDescriptions(newDescriptions);
  }, [animal]);

  return (
    <div className="animal-details">
      <h2>{animal.name}</h2>
      <p>{descriptions.join(', ')}</p>
      <button
        onClick={onHideDetails}
        className={darkTheme ? 'dark-link' : 'light-link'}
      >
        Hide Details
      </button>
    </div>
  );
};

export default AnimalDetails;
