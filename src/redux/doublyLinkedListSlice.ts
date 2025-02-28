import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoublyLinkedListNode<T> {
  value: T;
  next: string | null; // Store node identifiers for linking
  prev: string | null;
}

interface DoublyLinkedListState<T> {
  nodes: Record<string, DoublyLinkedListNode<T>>; // Store nodes by ID
  head: string | null;
  tail: string | null;
  current: string | null; // For forward/backward traversal
}

const initialState: DoublyLinkedListState<any> = {
  nodes: {},
  head: null,
  tail: null,
  current: null,
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const doublyLinkedListSlice = createSlice({
  name: "doublyLinkedList",
  initialState,
  reducers: {
    append: (state, action: PayloadAction<any>) => {
      const id = generateId();
      const newNode: DoublyLinkedListNode<any> = {
        value: action.payload,
        next: null,
        prev: state.tail,
      };
      state.nodes[id] = newNode;

      if (state.tail) {
        state.nodes[state.tail].next = id;
      } else {
        state.head = id;
      }

      state.tail = id;
      if (!state.current) {
        state.current = state.head;
      }
    },
    prepend: (state, action: PayloadAction<any>) => {
      const id = generateId();
      const newNode: DoublyLinkedListNode<any> = {
        value: action.payload,
        next: state.head,
        prev: null,
      };
      state.nodes[id] = newNode;

      if (state.head) {
        state.nodes[state.head].prev = id;
      } else {
        state.tail = id;
      }

      state.head = id;
      if (!state.current) {
        state.current = state.head;
      }
    },
    delete: (state, action: PayloadAction<any>) => {
      const nodeId = Object.keys(state.nodes).find(
        (id) => state.nodes[id].value === action.payload
      );
      if (!nodeId) return;

      const node = state.nodes[nodeId];
      if (node.prev) {
        state.nodes[node.prev].next = node.next;
      } else {
        state.head = node.next;
      }

      if (node.next) {
        state.nodes[node.next].prev = node.prev;
      } else {
        state.tail = node.prev;
      }

      if (state.current === nodeId) {
        state.current = node.next || node.prev;
      }

      delete state.nodes[nodeId];
    },
    deleteAll: (state) => {
      state.nodes = {};
      state.head = null;
      state.tail = null;
      state.current = null;
    },
    goForward: (state) => {
      if (state.current && state.nodes[state.current].next) {
        state.current = state.nodes[state.current].next;
      }
    },
    goBackward: (state) => {
      if (state.current && state.nodes[state.current].prev) {
        state.current = state.nodes[state.current].prev;
      }
    },
  },
});

export const {
  append,
  prepend,
  delete: deleteNode,
  deleteAll,
  goForward,
  goBackward,
} = doublyLinkedListSlice.actions;

export default doublyLinkedListSlice.reducer;
