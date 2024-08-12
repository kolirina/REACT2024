import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './slices/selectedItemsSlice';
import loadingMiddleware from './middleware/loadingMiddleware';
import loadingReducer from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
