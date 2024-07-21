import React, { createContext, ReactNode, useState } from 'react';

const ThemeContext = createContext<boolean>(false);
const ThemeContextUpdate = createContext<() => void>(() => {});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState(false);

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
