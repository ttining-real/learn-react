import { create } from 'zustand';

const INITIAL_VALUE = 0;

const stateCreator = (set, get) => {
  const increment = (by = 1) => {
    const prevCount = get().count;
    const nextCount = prevCount + by;
    set({ count: nextCount });
  };

  const decrement = (by = 1) => {
    const prevCount = get().count;
    const nextCount = prevCount - by;
    set({ count: nextCount });
  };

  const reset = () => {
    set({ count: INITIAL_VALUE });
  };

  return { count: INITIAL_VALUE, increment, decrement, reset };
};

export const useCounter = create(stateCreator);
