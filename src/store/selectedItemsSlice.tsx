import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  uid: string;
  name: string;
  description: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<SelectedItem>) => {
      if (!state.items.some((item) => item.uid === action.payload.uid)) {
        state.items.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
