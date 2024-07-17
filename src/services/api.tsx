import { SEARCH_URL } from '../constants';

export const searchAnimals = async (
  searchTerm: string,
  currentPage = 0,
  pageSize = 15,
) => {
  const apiEndpoint = `${SEARCH_URL}/search?pageNumber=${currentPage}&pageSize=${pageSize}&title=${searchTerm}&name=${searchTerm}`;
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const getAnimalDetails = async (id: string) => {
  const apiEndpoint = `${SEARCH_URL}?uid=${id}`;
  const response = await fetch(apiEndpoint, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
