import { GetServerSideProps } from 'next';
import { HomePageProps } from '../types';
import { fetchAnimalData } from '../services/fetchAnimalData';

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context,
) => {
  const initialSearchTerm = (context.query.search as string) || '';
  const initialPage = parseInt(context.query.page as string, 10) || 1;

  try {
    const { initialAnimals, totalPages } = await fetchAnimalData(
      initialSearchTerm,
      initialPage,
    );

    return {
      props: {
        initialSearchTerm,
        initialPage,
        initialAnimals,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Failed to fetch initial animal data:', error);

    return {
      props: {
        initialSearchTerm,
        initialPage,
        initialAnimals: [],
        totalPages: 0,
      },
    };
  }
};
