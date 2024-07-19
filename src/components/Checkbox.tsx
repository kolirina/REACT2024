import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectItem, unselectItem } from '../store/selectedItemsSlice';
import { SelectedItem } from '../types';
import '../App.css';

interface CheckboxProps {
  item: SelectedItem;
}

const Checkbox: React.FC<CheckboxProps> = ({ item }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const isChecked = selectedItems.some((i: SelectedItem) => i.uid === item.uid);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectItem(item));
    } else {
      dispatch(unselectItem(item.uid));
    }
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
