import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);
  const [highlight, setHighlight] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData]);

  return (
    <div>
      <h1>Submitted Data</h1>
      {formData ? (
        <div
          style={{
            padding: '10px',
            border: highlight ? '2px solid green' : '1px solid black',
            backgroundColor: highlight ? '#e0ffe0' : 'white',
            transition: 'background-color 1s ease, border 1s ease',
          }}
        >
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender}
          </p>
          {formData.picture && (
            <div>
              <strong>Uploaded Picture:</strong>
              <img
                src={formData.picture}
                alt="Uploaded"
                style={{
                  maxWidth: '50%',
                  height: 'auto',
                  border: '1px solid transparent',
                  borderRadius: '4px',
                }}
              />
            </div>
          )}
          {/* <p>
            <strong>Country:</strong> {formData.country}
          </p> */}
        </div>
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
};

export default Home;
