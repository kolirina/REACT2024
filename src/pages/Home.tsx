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
      <div className="tilesWrapper">
        {formDataList.length > 0 ? (
          [...formDataList].reverse().map((formData, reverseIndex) => {
            const originalIndex = formDataList.length - 1 - reverseIndex;

            return (
              <div
                key={originalIndex}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '35px',
                  marginBottom: '10px',
                  borderRadius: '15px',
                  backgroundColor:
                    originalIndex === highlightedIndex
                      ? 'rgba(72, 175, 166, 0.507)'
                      : 'white',
                  transition: 'background-color 1s ease, border 1s ease',
                }}
              >
                {formData.picture && (
                  <div>
                    <img
                      src={formData.picture}
                      alt="Uploaded"
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                      }}
                    />
                  </div>
                )}
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
    </div>
  );
};

export default Home;
