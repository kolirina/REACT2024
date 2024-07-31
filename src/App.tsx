import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AnimalDetails from './components/AnimalDetails';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="details/:id" element={<AnimalDetails />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Provider>
        </ThemeProvider>
        ,
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
