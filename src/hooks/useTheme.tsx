'use client';

import { useContext } from 'react';
import { ThemeContext, ThemeContextUpdate } from '../context/ThemeContext';

export const useTheme = () => useContext(ThemeContext);
export const useThemeUpdate = () => useContext(ThemeContextUpdate);
