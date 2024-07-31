import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '../src/context/ThemeContext';
import './global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
