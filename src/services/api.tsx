export const searchAnimals = async (
  searchTerm: string,
  pageNumber = 0,
  pageSize = 15,
) => {
  const apiEndpoint = `https://stapi.co/api/v1/rest/animal/search?pageNumber=${pageNumber}&pageSize=${pageSize}&title=${searchTerm}&name=${searchTerm}`;
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
