import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Home: React.FC = () => {
  const formDataList = useSelector((state: RootState) => state.form);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (formDataList.length > 0) {
      setHighlightedIndex(formDataList.length - 1);
      const timer = setTimeout(() => {
        setHighlightedIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formDataList]);

  return (
    <div>
      <h1>Submitted Data</h1>
      {formDataList.length > 0 ? (
        [...formDataList].reverse().map((formData, reverseIndex) => {
          const originalIndex = formDataList.length - 1 - reverseIndex;

          return (
            <div
              key={originalIndex}
              style={{
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '15px',
                backgroundColor:
                  originalIndex === highlightedIndex ? '#e0ffe0' : 'white',
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
                      borderRadius: '10px',
                    }}
                  />
                </div>
              )}
              <p>
                <strong>Country:</strong> {formData.country}
              </p>
            </div>
          );
        })
      ) : (
        <p>No data submitted yet.</p>
      )}
    </div>
  );
};

export default Home;
