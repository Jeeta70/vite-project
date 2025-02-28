import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { append, prepend, deleteNode, traverseForward, traverseBackward } from '../store/doublyLinkedListSlice';
import { RootState } from '../store/store';

const DoublyLinkedListUI: React.FC = () => {
  const dispatch = useDispatch();
  const { traversal } = useSelector((state: RootState) => state.doublyLinkedList);
  const [inputValue, setInputValue] = useState<number>(0);

  const handleAddNode = (value: number) => {
    dispatch(append(value));
  };

  const handlePrependNode = (value: number) => {
    dispatch(prepend(value));
  };

  const handleDeleteNode = (value: number) => {
    dispatch(deleteNode(value));
  };

  const handleTraverseForward = () => {
    dispatch(traverseForward());
  };

  const handleTraverseBackward = () => {
    dispatch(traverseBackward());
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <button onClick={() => handleAddNode(inputValue)}>Add Node</button>
      <button onClick={() => handlePrependNode(inputValue)}>Prepend Node</button>
      <button onClick={() => handleDeleteNode(inputValue)}>Delete Node</button>

      <div>
        <h3>Traversal:</h3>
        <button onClick={handleTraverseForward}>Traverse Forward</button>
        <button onClick={handleTraverseBackward}>Traverse Backward</button>
        <p>{traversal && traversal.join(' -> ')}</p>
      </div>

      <div>
        <h3>Current State:</h3>
        <p>{JSON.stringify(useSelector((state: RootState) => state.doublyLinkedList), null, 2)}</p>
      </div>
    </div>
  );
};

export default DoublyLinkedListUI;
