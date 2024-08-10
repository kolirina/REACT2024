import { SEARCH_URL, PAGE_SIZE } from '../constants';
import { Animal } from '../types';

export const fetchAnimalData = async (
  searchTerm: string = '',
  page: number = 1,
): Promise<{
  initialAnimals: Animal[];
  totalPages: number;
}> => {
  try {
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
      initialAnimals: data.animals || [],
      totalPages: data.page.totalPages || 1,
    };
  } catch (error) {
    console.error('Failed to fetch animal data:', error);
    return {
      initialAnimals: [],
      totalPages: 1,
    };
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
