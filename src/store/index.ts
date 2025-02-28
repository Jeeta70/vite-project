// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import doublyLinkedListReducer from './doublyLinkedListSlice';

export const store = configureStore({
  reducer: {
    doublyLinkedList: doublyLinkedListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
