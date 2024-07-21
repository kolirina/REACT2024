import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnimalDetailsQuery } from '../services/apiSlice';
import { Link } from 'react-router-dom';
import '../App.css';

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetAnimalDetailsQuery(id!);
  const [descriptions, setDescriptions] = useState<string[]>([]);

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
          <Link to="/">Hide Details</Link>
        </div>
      ) : (
        <p>No details available</p>
      )}
    </div>
  );
};

export default AnimalDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useOutletContext } from 'react-router-dom';
// import { getAnimalDetails } from '../services/api';

// interface Animal {
//   uid: string;
//   name: string;
//   description?: string;
//   earthAnimal?: boolean;
//   earthInsect?: boolean;
//   avian?: boolean;
//   canine?: boolean;
//   feline?: boolean;
// }

// const AnimalDetails: React.FC = () => {
//   const { setShowingAnimalDetails } = useOutletContext<{
//     setShowingAnimalDetails: (value: boolean) => void;
//   }>();
//   const [animal, setAnimal] = useState<Animal | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAnimalDetails = async () => {
//       if (!id) {
//         setAnimal(null);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const data = await getAnimalDetails(id);
//         const animal = data.animal;

//         if (animal) {
//           const descriptions = [];
//           if (animal.earthAnimal) descriptions.push('Earth Animal 🐾');
//           if (animal.earthInsect) descriptions.push('Earth Insect 🦗');
//           if (animal.avian) descriptions.push('Avian 🦜');
//           if (animal.canine) descriptions.push('Canine 🐶');
//           if (animal.feline) descriptions.push('Feline 😺');
//           if (descriptions.length === 0) {
//             descriptions.push('an infinitely cute animal 👻');
//           }

//           setAnimal({
//             uid: animal.uid,
//             name: animal.name,
//             description: descriptions.join(', '),
//           });
//         } else {
//           setAnimal(null);
//         }
//       } catch (error) {
//         console.error('Error fetching animal details:', error);
//         setAnimal(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAnimalDetails();
//   }, [id]);

//   useEffect(() => {
//     setShowingAnimalDetails(true);
//     return () => {
//       setShowingAnimalDetails(false);
//     };
//   }, [setShowingAnimalDetails]);

//   if (isLoading) {
//     return (
//       <div className="loader-container">
//         <div className="loader">Loading</div>
//       </div>
//     );
//   }

//   if (!animal) {
//     return <div>No animal details found.</div>;
//   }

//   return (
//     <div className="animal-details">
//       <h2>{animal.name}</h2>
//       <p>{animal.description}</p>
//       <Link to={'/'}>Hide Details</Link>
//     </div>
//   );
// };

// export default AnimalDetails;
