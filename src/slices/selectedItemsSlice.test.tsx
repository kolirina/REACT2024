import { describe, it, expect } from 'vitest';
import reducer, {
  selectItem,
  unselectItem,
  unselectAll,
  toggleItem,
} from './selectedItemsSlice';
import { SelectedItem } from '../types';

const initialState = {
  items: [],
};

const sampleItem: SelectedItem = {
  uid: 'item-1',
  name: 'cat',
};

describe('selectedItemsSlice', () => {
  it('should handle selectItem', () => {
    const state = reducer(initialState, selectItem(sampleItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(sampleItem);
  });

  it('should handle unselectItem', () => {
    const populatedState = { items: [sampleItem] };
    const state = reducer(populatedState, unselectItem(sampleItem.uid));
    expect(state.items).toHaveLength(0);
  });

  it('should handle unselectAll', () => {
    const populatedState = {
      items: [sampleItem, { uid: 'item-2', name: 'dog' }],
    };
    const state = reducer(populatedState, unselectAll());
    expect(state.items).toHaveLength(0);
  });

  it('should handle toggleItem by adding an item', () => {
    const state = reducer(initialState, toggleItem(sampleItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(sampleItem);
  });

  it('should handle toggleItem by removing an item', () => {
    const populatedState = { items: [sampleItem] };
    const state = reducer(populatedState, toggleItem(sampleItem));
    expect(state.items).toHaveLength(0);
  });
});
