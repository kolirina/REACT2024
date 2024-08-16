import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  //   acceptTerms: boolean;
  picture: string | null;
  //   country: string;
}

const initialFormState: FormData = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: '',
  //   acceptTerms: false,
  picture: '',
  //   country: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFormData } = formSlice.actions;

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
