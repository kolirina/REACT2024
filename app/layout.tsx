'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { ThemeProvider } from '../src/context/ThemeContext';
import '../src/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </Provider>
    </ThemeProvider>
  );
}
