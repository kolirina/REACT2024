import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedItem } from '../types';

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
      state.items.push(action.payload);
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.uid !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
    toggleItem: (state, action: PayloadAction<SelectedItem>) => {
      const index = state.items.findIndex(
        (item) => item.uid === action.payload.uid,
      );
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { selectItem, unselectItem, unselectAll, toggleItem } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
