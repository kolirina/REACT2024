import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setPage, setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;
