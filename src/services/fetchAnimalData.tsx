import { SEARCH_URL, PAGE_SIZE } from '../constants';
import { Animal } from '../types';
import { GetStaticProps } from 'next';

export const fetchAnimalData = async (
  searchTerm: string = '',
  page: number = 1,
): Promise<{
  initialSearchTerm: string;
  initialPage: number;
  initialAnimals: Animal[];
  totalPages: number;
}> => {
  try {
    if (typeof window !== 'undefined') {
      searchTerm = localStorage.getItem('searchTerm') || '';
    }
    const response = await fetch(
      `${SEARCH_URL}/search?pageNumber=${page - 1}&pageSize=${PAGE_SIZE}&title=${searchTerm}&name=${searchTerm}`,
      {
        method: 'POST',
      },
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      initialSearchTerm: searchTerm,
      initialPage: page,
      initialAnimals: data.animals || [],
      totalPages: data.page.totalPages || 1,
    };
  } catch (error) {
    console.error('Failed to fetch animal data:', error);
    return {
      initialSearchTerm: searchTerm,
      initialPage: page,
      initialAnimals: [],
      totalPages: 1,
    };
  }
};

export const getStaticProps: GetStaticProps = async () => {
  const { initialSearchTerm, initialPage, initialAnimals, totalPages } =
    await fetchAnimalData();

  return {
    props: {
      initialSearchTerm,
      initialPage,
      initialAnimals,
      totalPages,
    },
    revalidate: 60,
  };
};

export const fetchAnimalIds = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${SEARCH_URL}/animals`);

    if (!response.ok) {
      throw new Error(`Error fetching animal IDs: ${response.statusText}`);
    }

    if (response.headers.get('content-length') === '0') {
      console.warn('Empty response body');
      return [];
    }

    const data = await response.json();

    if (!data.animals || !Array.isArray(data.animals)) {
      throw new Error('Invalid data format');
    }

    return data.animals.map((animal: Animal) => animal.uid);
  } catch (error) {
    console.error('Failed to fetch animal IDs:', error);
    return [];
  }
};

export const fetchAnimalDetails = async (id: string): Promise<Animal> => {
  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/animal/?uid=${id}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching animal details: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }

    return data.animal;
  } catch (error) {
    console.error('Failed to fetch animal details:', error);
    throw error;
  }
};
