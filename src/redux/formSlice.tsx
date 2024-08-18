import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types';
const initialFormState: FormData[] = [];

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
