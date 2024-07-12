import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimalDetails } from '../services/api';

interface Animal {
  uid: string;
  name: string;
  description: string;
}

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getAnimalDetails(id!);
        setAnimal(data);
      } catch (error) {
        console.error('Error fetching animal details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!animal) {
    return <div>No animal details found.</div>;
  }

  return (
    <div className="animal-details">
      <button onClick={handleClose}>Close</button>
      <h2>{animal.name}</h2>
      <p>{animal.description}</p>
    </div>
  );
};

export default AnimalDetails;
