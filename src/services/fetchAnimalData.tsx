import { SEARCH_URL, PAGE_SIZE } from '../constants';
import { Animal } from '../types';

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
      const storedSearchTerm = localStorage.getItem('searchTerm');
      if (storedSearchTerm) {
        searchTerm = storedSearchTerm;
      }
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
