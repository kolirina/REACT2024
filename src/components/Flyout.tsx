import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { unselectAll } from '../store/selectedItemsSlice';
import { SelectedItem } from '../types';

const downloadCSV = (items: SelectedItem[]) => {
  const csvRows = [
    ['UID', 'Name', 'Description'],
    ...items.map((item) => [item.uid, item.name, item.description]),
  ];

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    csvRows.map((row) => row.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${items.length}_animals.csv`);
  document.body.appendChild(link);
  link.click();
};

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedItems.length} animals are selected</p>
      <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
      <button onClick={() => downloadCSV(selectedItems)}>Download</button>
    </div>
  );
};

export default Flyout;
