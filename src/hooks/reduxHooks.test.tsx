import { renderHook } from '@testing-library/react-hooks'; 
import { configureStore } from '@reduxjs/toolkit'; 
import { Provider } from 'react-redux'; 
import React, { ReactNode } from 'react'; 
import { useAppDispatch, useAppSelector } from './reduxHooks'; 
import { api } from '../services/api'; 
import catsReducer from '../reducers/catSlice'; 

// Function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer, // Add the API reducer
      cats: catsReducer, // Add the cats reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware), // Add API middleware to handle async actions
  });
};

interface WrapperProps {
  children: ReactNode; // Define the type for children prop
}

// Create a test store instance
const store = createTestStore();

// Wrapper component to provide the Redux store to the hook
const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('reduxHooks', () => {
  // Test case for useAppDispatch hook
  test('useAppDispatch should return the dispatch function', () => {
    // Render the useAppDispatch hook with the Redux store
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: Wrapper,
    });

    // Assert that the result matches the store's dispatch function
    expect(result.current).toBe(store.dispatch);
  });

  // Test case for useAppSelector hook
  test('useAppSelector should return the correct state', () => {
    // Render the useAppSelector hook with the Redux store
    const { result } = renderHook(() => useAppSelector((state) => state.cats), {
      wrapper: Wrapper,
    });

    // Assert that the result matches the current state of the cats reducer
    expect(result.current).toEqual(store.getState().cats);
  });
});