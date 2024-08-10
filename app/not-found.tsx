'use client';

import React from 'react';
import { useTheme } from '../src/hooks/useTheme';

const NotFound: React.FC = () => {
  const darkTheme = useTheme();
  return (
    <div className={darkTheme ? 'dark-NotFound' : 'light-NotFound'}>
      <h2>404 Not Found 😿</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
