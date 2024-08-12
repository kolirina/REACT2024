import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from './getServerSideProps';
import { fetchAnimalData } from '../services/fetchAnimalData';
import { Animal } from '../types';

vi.mock('../services/fetchAnimalData', () => ({
  fetchAnimalData: vi.fn(),
}));

describe('getServerSideProps', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return props with fetched data when fetchAnimalData succeeds', async () => {
    (fetchAnimalData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      initialAnimals: mockAnimals,
      totalPages: 3,
    });

    const context = {
      query: {
        search: 'Lion',
        page: '1',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        initialSearchTerm: 'Lion',
        initialPage: 1,
        initialAnimals: mockAnimals,
        totalPages: 3,
      },
    });
    expect(fetchAnimalData).toHaveBeenCalledWith('Lion', 1);
  });

  it('should return default props when no search or page query is provided', async () => {
    (fetchAnimalData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      initialAnimals: [],
      totalPages: 0,
    });

    const context = {
      query: {},
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        initialSearchTerm: '',
        initialPage: 1,
        initialAnimals: [],
        totalPages: 0,
      },
    });
    expect(fetchAnimalData).toHaveBeenCalledWith('', 1);
  });

  it('should handle fetchAnimalData failure gracefully', async () => {
    (fetchAnimalData as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Failed to fetch'),
    );

    const context = {
      query: {
        search: 'Tiger',
        page: '2',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(result).toEqual({
      props: {
        initialSearchTerm: 'Tiger',
        initialPage: 2,
        initialAnimals: [],
        totalPages: 0,
      },
    });
    expect(fetchAnimalData).toHaveBeenCalledWith('Tiger', 2);
  });

  it('should handle invalid page numbers gracefully', async () => {
    (fetchAnimalData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      initialAnimals: [],
      totalPages: 0,
    });

    const context = {
      query: {
        search: 'Elephant',
        page: 'invalid',
      },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);
    expect(result).toEqual({
      props: {
        initialSearchTerm: 'Elephant',
        initialPage: 1,
        initialAnimals: [],
        totalPages: 0,
      },
    });
    expect(fetchAnimalData).toHaveBeenCalledWith('Elephant', 1);
  });
});
