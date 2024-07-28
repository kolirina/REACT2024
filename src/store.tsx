import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import selectedItemsReducer from './slices/selectedItemsSlice';
import paginationReducer from './slices/paginationSlice';
import loadingMiddleware from './middleware/loadingMiddleware';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedItems: selectedItemsReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, loadingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
