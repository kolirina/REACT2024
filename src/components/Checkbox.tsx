'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleItem } from '../slices/selectedItemsSlice';
import { SelectedItem } from '../types';

interface CheckboxProps {
  item: SelectedItem;
}

const Checkbox: React.FC<CheckboxProps> = ({ item }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const isChecked = selectedItems.some((i: SelectedItem) => i.uid === item.uid);

  const handleChange = () => {
    dispatch(toggleItem(item));
  };

  return (
    <input
      className="light-checkbox"
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
