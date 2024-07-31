'use client';

import { useState, useEffect } from 'react';

function useSearchTerm() {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm);
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
}

export default useSearchTerm;
