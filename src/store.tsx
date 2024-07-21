import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
