import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import useSearchTerm from './useSearchTerm';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useSearchTerm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with value from localStorage', () => {
    localStorage.setItem('searchTerm', 'initial term');
    const { result } = renderHook(() => useSearchTerm());
    expect(result.current[0]).toBe('initial term');
  });

  it('should return an empty string if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchTerm());
    expect(result.current[0]).toBe('');
  });
});
