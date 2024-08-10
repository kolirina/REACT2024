import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAnimalDetails, fetchAnimalData } from './fetchAnimalData';
import { Animal } from '../types';

const SEARCH_URL = 'https://stapi.co/api/v1/rest/animal';
const PAGE_SIZE = 15;

const mockAnimals: Animal[] = [
  {
    uid: '1',
    name: 'Lion',
    earthAnimal: true,
    earthInsect: false,
    avian: false,
    canine: false,
    feline: true,
  },
  {
    uid: '2',
    name: 'Eagle',
    earthAnimal: false,
    earthInsect: false,
    avian: true,
    canine: false,
    feline: false,
  },
];

const mockFetchResponse = (
  data: unknown,
  status = 200,
  headers: HeadersInit = {},
) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: () => Promise.resolve(data),
    headers: new Headers(headers),
  });

globalThis.fetch = vi.fn();

describe('fetchAnimalDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch animal details successfully', async () => {
    const mockAnimal: Animal = {
      uid: '1',
      name: 'Lion',
      descriptions: ['Big cat'],
    };

    global.fetch = vi
      .fn()
      .mockResolvedValue(mockFetchResponse({ animal: mockAnimal }));

    const result = await fetchAnimalDetails('1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/animal/?uid=1',
    );
    expect(result).toEqual(mockAnimal);
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse({}, 404));

    await expect(fetchAnimalDetails('1')).rejects.toThrow(
      'Error fetching animal details: Error',
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/animal/?uid=1',
    );
  });

  it('should throw an error if the response data format is invalid', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse(null));

    await expect(fetchAnimalDetails('1')).rejects.toThrow(
      'Invalid data format',
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/animal/?uid=1',
    );
  });

  it('should log an error and rethrow it', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockError = new Error('Network error');

    global.fetch = vi.fn().mockRejectedValue(mockError);

    await expect(fetchAnimalDetails('1')).rejects.toThrow('Network error');

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch animal details:',
      mockError,
    );

    consoleErrorSpy.mockRestore();
  });
});

describe('fetchAnimalData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch animal data successfully', async () => {
    const mockResponseData = {
      animals: mockAnimals,
      page: { totalPages: 3 },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValue(mockFetchResponse(mockResponseData));

    const result = await fetchAnimalData('cat', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      `${SEARCH_URL}/search?pageNumber=1&pageSize=${PAGE_SIZE}&title=cat&name=cat`,
      { method: 'POST' },
    );
    expect(result).toEqual({
      initialAnimals: mockAnimals,
      totalPages: 3,
    });
  });

  it('should handle fetch errors gracefully and return default values', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse({}, 500));

    const result = await fetchAnimalData('cat', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      `${SEARCH_URL}/search?pageNumber=1&pageSize=${PAGE_SIZE}&title=cat&name=cat`,
      { method: 'POST' },
    );
    expect(result).toEqual({
      initialAnimals: [],
      totalPages: 1,
    });
  });

  it('should handle network errors gracefully and return default values', async () => {
    const mockError = new Error('Network error');
    global.fetch = vi.fn().mockRejectedValue(mockError);

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const result = await fetchAnimalData('cat', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      `${SEARCH_URL}/search?pageNumber=1&pageSize=${PAGE_SIZE}&title=cat&name=cat`,
      { method: 'POST' },
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to fetch animal data:',
      mockError,
    );
    expect(result).toEqual({
      initialAnimals: [],
      totalPages: 1,
    });

    consoleErrorSpy.mockRestore();
  });

  it('should return default values if the response data format is invalid', async () => {
    global.fetch = vi.fn().mockResolvedValue(mockFetchResponse(null));

    const result = await fetchAnimalData('cat', 2);

    expect(global.fetch).toHaveBeenCalledWith(
      `${SEARCH_URL}/search?pageNumber=1&pageSize=${PAGE_SIZE}&title=cat&name=cat`,
      { method: 'POST' },
    );
    expect(result).toEqual({
      initialAnimals: [],
      totalPages: 1,
    });
  });

  it('should handle empty search term and default to first page', async () => {
    const mockResponseData = {
      animals: mockAnimals,
      page: { totalPages: 2 },
    };

    global.fetch = vi
      .fn()
      .mockResolvedValue(mockFetchResponse(mockResponseData));

    const result = await fetchAnimalData();

    expect(global.fetch).toHaveBeenCalledWith(
      `${SEARCH_URL}/search?pageNumber=0&pageSize=${PAGE_SIZE}&title=&name=`,
      { method: 'POST' },
    );
    expect(result).toEqual({
      initialAnimals: mockAnimals,
      totalPages: 2,
    });
  });
});
