import { Middleware } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import { setLoading } from '../slices/loadingSlice';

const loadingMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  if (
    apiSlice.endpoints.searchAnimals.matchPending(action) ||
    apiSlice.endpoints.getAnimalDetails.matchPending(action)
  ) {
    storeAPI.dispatch(setLoading(true));
  } else if (
    apiSlice.endpoints.searchAnimals.matchFulfilled(action) ||
    apiSlice.endpoints.getAnimalDetails.matchFulfilled(action) ||
    apiSlice.endpoints.searchAnimals.matchRejected(action) ||
    apiSlice.endpoints.getAnimalDetails.matchRejected(action)
  ) {
    storeAPI.dispatch(setLoading(false));
  }

  return next(action);
};

export default loadingMiddleware;
