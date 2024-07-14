import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnimalDetails } from '../services/api';

interface Animal {
  uid: string;
  name: string;
  description?: string;
  earthAnimal?: boolean;
  earthInsect?: boolean;
  avian?: boolean;
  canine?: boolean;
  feline?: boolean;
}

const AnimalDetails: React.FC = () => {
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      if (!id) {
        setAnimal(null);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getAnimalDetails(id);
        const animal = data.animal;

        if (animal) {
          const descriptions = [];
          if (animal.earthAnimal) descriptions.push('Earth Animal 🐾');
          if (animal.earthInsect) descriptions.push('Earth Insect 🦗');
          if (animal.avian) descriptions.push('Avian 🦜');
          if (animal.canine) descriptions.push('Canine 🐶');
          if (animal.feline) descriptions.push('Feline 😺');
          if (descriptions.length === 0) {
            descriptions.push('an infinitely cute animal 👻');
          }

          setAnimal({
            uid: animal.uid,
            name: animal.name,
            description: descriptions.join(', '),
          });
        } else {
          setAnimal(null);
        }
      } catch (error) {
        console.error('Error fetching animal details:', error);
        setAnimal(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!animal) {
    return <div>No animal details found.</div>;
  }

  return (
    <div className="animal-details">
      <h2>{animal.name}</h2>
      <p>{animal.description}</p>
      <Link to={'/'}>Hide Details</Link>
    </div>
  );
};

export default AnimalDetails;
