import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Animal, AnimalDetails } from '../types';
import { SEARCH_URL } from '../constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: SEARCH_URL }),
  endpoints: (builder) => ({
    searchAnimals: builder.query<
      { animals: Animal[]; page: { pageNumber: number; totalPages: number } },
      { searchTerm: string; pageNumber: number; pageSize: number }
    >({
      query: ({ searchTerm, pageNumber, pageSize }) => ({
        url: `/search?pageNumber=${pageNumber}&pageSize=${pageSize}&title=${searchTerm}&name=${searchTerm}`,
        method: 'POST',
      }),
    }),
    getAnimalDetails: builder.query<AnimalDetails, string>({
      query: (id) => `?uid=${id}`,
    }),
  }),
});

export const { useSearchAnimalsQuery, useGetAnimalDetailsQuery } = apiSlice;
