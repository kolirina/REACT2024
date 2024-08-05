import React, { createContext, ReactNode, useState, useEffect } from 'react';

const ThemeContext = createContext<boolean | undefined>(undefined);
const ThemeContextUpdate = createContext<(() => void) | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(darkTheme));
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  };

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ThemeContextUpdate.Provider value={toggleTheme}>
        {children}
      </ThemeContextUpdate.Provider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, ThemeContextUpdate };
