import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { unselectAll } from '../slices/selectedItemsSlice';
import { downloadCSV } from '../utils/csx';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items,
  );

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCSV(selectedItems);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <span>{selectedItems.length} animals are selected</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
