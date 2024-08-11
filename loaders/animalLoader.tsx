import { json, LoaderFunction } from '@remix-run/node';
import { SEARCH_URL } from '../src/constants';
import { Animal } from '../src/types';

export const animalLoader: LoaderFunction = async ({ params }) => {
  const { id } = params as { id: string };
  const response = await fetch(`${SEARCH_URL}?uid=${id}`);

  if (!response.ok) {
    throw new Response('Error loading animal details', { status: 500 });
  }

  const data: Animal = await response.json();

  return json({ data });
};
