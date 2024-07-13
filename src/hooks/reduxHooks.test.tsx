// src/hooks/reduxHooks.test.ts
import { renderHook } from '@testing-library/react-hooks';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import { api } from '../services/api';
import catsReducer from '../reducers/catSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      cats: catsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

interface WrapperProps {
  children: ReactNode;
}

const store = createTestStore();

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('reduxHooks', () => {
  test('useAppDispatch should return the dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), {
      wrapper: Wrapper,
    });

    expect(result.current).toBe(store.dispatch);
  });

  test('useAppSelector should return the correct state', () => {
    const { result } = renderHook(() => useAppSelector((state) => state.cats), {
      wrapper: Wrapper,
    });

    expect(result.current).toEqual(store.getState().cats);
  });
});