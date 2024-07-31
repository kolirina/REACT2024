import React, { createContext, ReactNode, useState, useEffect } from 'react';

// Создайте контекст для значения темы
const ThemeContext = createContext<boolean | undefined>(undefined);
// Создайте контекст для функции переключения темы
const ThemeContextUpdate = createContext<(() => void) | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    // Этот код выполняется только на клиенте
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    // Сохраняйте тему в localStorage при изменении
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

// import React, { createContext, ReactNode, useState, useEffect } from 'react';

// const ThemeContext = createContext<boolean>(false);
// const ThemeContextUpdate = createContext<() => void>(() => {});

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// const ThemeProvider = ({ children }: ThemeProviderProps) => {
//   // Initialize theme from localStorage or default to false (light theme)
//   const [darkTheme, setDarkTheme] = useState<boolean>(() => {
//     const savedTheme = localStorage.getItem('theme');
//     return savedTheme ? JSON.parse(savedTheme) : false;
//   });

//   useEffect(() => {
//     // Save theme to localStorage whenever it changes
//     localStorage.setItem('theme', JSON.stringify(darkTheme));
//   }, [darkTheme]);

//   const toggleTheme = () => {
//     setDarkTheme((prevDarkTheme) => !prevDarkTheme);
//   };

//   return (
//     <ThemeContext.Provider value={darkTheme}>
//       <ThemeContextUpdate.Provider value={toggleTheme}>
//         {children}
//       </ThemeContextUpdate.Provider>
//     </ThemeContext.Provider>
//   );
// };

// export { ThemeProvider, ThemeContext, ThemeContextUpdate };
