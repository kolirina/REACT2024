// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { Provider, useSelector } from 'react-redux';
// // import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import AnimalDetails from './AnimalDetails';
// import { store } from '../store';
// import '@testing-library/jest-dom';
// import { useGetAnimalDetailsQuery } from '../services/apiSlice';

// vi.mock('../services/apiSlice', async (importOriginal) => {
//   const actual = await importOriginal<typeof import('../services/apiSlice')>();
//   return {
//     ...actual,
//     useGetAnimalDetailsQuery: vi.fn(),
//   };
// });

// const mockUseGetAnimalDetailsQuery =
//   useGetAnimalDetailsQuery as unknown as ReturnType<typeof vi.fn>;

// vi.mock('react-redux', async () => {
//   const actual = await vi.importActual('react-redux');
//   return {
//     ...actual,
//     useSelector: vi.fn(),
//   };
// });

// const useSelectorMock = useSelector as unknown as ReturnType<typeof vi.fn>;

// describe('AnimalDetails Component', () => {
//   beforeEach(() => {
//     useSelectorMock.mockClear();
//     mockUseGetAnimalDetailsQuery.mockClear();
//   });

//   it('should display "Loading..." while data is being fetched', () => {
//     mockUseGetAnimalDetailsQuery.mockReturnValue({ data: null, error: null });
//     useSelectorMock.mockReturnValue(true);

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/animals/1']}>
//           <Routes>
//             <Route path="/animals/:id" element={<AnimalDetails />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>,
//     );

//     expect(screen.getByText('Loading...')).toBeInTheDocument();
//   });

//   it('should display an error message if there is an error loading data', () => {
//     mockUseGetAnimalDetailsQuery.mockReturnValue({ data: null, error: true });
//     useSelectorMock.mockReturnValue(false);

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/animals/1']}>
//           <Routes>
//             <Route path="/animals/:id" element={<AnimalDetails />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>,
//     );

//     expect(
//       screen.getByText('Error loading animal details'),
//     ).toBeInTheDocument();
//   });

//   it('should display animal details if data is successfully loaded', () => {
//     const mockData = {
//       animal: {
//         name: 'Elephant',
//         earthAnimal: true,
//         earthInsect: false,
//         avian: false,
//         canine: false,
//         feline: false,
//       },
//     };

//     mockUseGetAnimalDetailsQuery.mockReturnValue({
//       data: mockData,
//       error: null,
//     });
//     useSelectorMock.mockReturnValue(false);

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/animals/1']}>
//           <Routes>
//             <Route path="/animals/:id" element={<AnimalDetails />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>,
//     );

//     expect(screen.getByText('Elephant')).toBeInTheDocument();
//     expect(screen.getByText('Earth Animal 🐾')).toBeInTheDocument();
//     expect(screen.getByText('Hide Details')).toBeInTheDocument();
//   });

//   it('should display "an infinitely cute animal 👻" if no other descriptions are present', () => {
//     const mockData = {
//       animal: {
//         name: 'Unknown',
//         earthAnimal: false,
//         earthInsect: false,
//         avian: false,
//         canine: false,
//         feline: false,
//       },
//     };

//     mockUseGetAnimalDetailsQuery.mockReturnValue({
//       data: mockData,
//       error: null,
//     });
//     useSelectorMock.mockReturnValue(false);

//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/animals/1']}>
//           <Routes>
//             <Route path="/animals/:id" element={<AnimalDetails />} />
//           </Routes>
//         </MemoryRouter>
//       </Provider>,
//     );

//     expect(screen.getByText('Unknown')).toBeInTheDocument();
//     expect(
//       screen.getByText('an infinitely cute animal 👻'),
//     ).toBeInTheDocument();
//   });
// });
