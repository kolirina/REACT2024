import { expect, vi } from 'vitest';
import { searchAnimals, getAnimalDetails } from './api';

describe('API functions', () => {
  beforeAll(() => {
    // Mocking global fetch
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('searchAnimals', () => {
    it('should fetch search results successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({ data: [{ id: 1, name: 'Lion' }] }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const searchTerm = 'lion';
      const currentPage = 0;
      const pageSize = 15;

      const result = await searchAnimals(searchTerm, currentPage, pageSize);

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should throw an error if network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({}),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const searchTerm = 'invalid_search_term';
      const currentPage = 0;
      const pageSize = 15;

      await expect(
        searchAnimals(searchTerm, currentPage, pageSize),
      ).rejects.toThrow('Network response was not ok');
    });
  });

  describe('getAnimalDetails', () => {
    it('should fetch animal details successfully', async () => {
      const mockResponse = {
        ok: true,
        json: async () => ({
          id: '123',
          name: 'Lion',
          description: 'King of the Jungle',
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const animalId = '123';

      const result = await getAnimalDetails(animalId);

      expect(result).toBeDefined();
      expect(result.name).toBe('Lion');
      expect(result.description).toBeDefined();
    });

    it('should throw an error if network response is not ok', async () => {
      const mockResponse = {
        ok: false,
        json: async () => ({}),
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const invalidAnimalId = 'invalid_id';

      await expect(getAnimalDetails(invalidAnimalId)).rejects.toThrow(
        'Network response was not ok',
      );
    });
  });
});
