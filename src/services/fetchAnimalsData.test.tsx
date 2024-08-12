import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchAnimalData,
  fetchAnimalIds,
  fetchAnimalDetails,
} from './fetchAnimalData';
import { Animal } from '../types';

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
    statusText: 'OK',
    json: () => Promise.resolve(data),
    headers: new Headers(headers),
  });

globalThis.fetch = vi.fn();

describe('fetchAnimalData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use localStorage searchTerm if available', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() =>
      mockFetchResponse({ animals: mockAnimals, page: { totalPages: 3 } }),
    );

    vi.stubGlobal('localStorage', {
      getItem: () => 'Tiger',
    });

    const result = await fetchAnimalData();

    expect(result.initialSearchTerm).toBe('Tiger');
  });
});

describe('fetchAnimalIds', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch animal IDs successfully', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => mockFetchResponse({ animals: mockAnimals }));

    const result = await fetchAnimalIds();

    expect(result).toEqual(mockAnimals.map((animal) => animal.uid));
  });

  it('should handle empty responses gracefully', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() =>
      mockFetchResponse([], 200, { 'content-length': '0' }),
    );

    const result = await fetchAnimalIds();

    expect(result).toEqual([]);
  });

  it('should handle fetch errors gracefully', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => mockFetchResponse({}, 500));

    const result = await fetchAnimalIds();

    expect(result).toEqual([]);
  });
});

describe('fetchAnimalDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch animal details successfully', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => mockFetchResponse({ animal: mockAnimals[0] }));

    const result = await fetchAnimalDetails('1');

    expect(result).toEqual(mockAnimals[0]);
  });

  it('should handle fetch errors gracefully', async () => {
    (
      globalThis.fetch as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation(() => mockFetchResponse({}, 500));

    await expect(fetchAnimalDetails('1')).rejects.toThrow(
      'Error fetching animal details: OK',
    );
  });
});
