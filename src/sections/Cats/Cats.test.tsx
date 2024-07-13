// src/sections/Cats/Cats.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cats from './Cats';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import catsReducer from '../../reducers/catSlice';
import { useGetCatsQuery } from '../../services/api';

// Мокаем useGetCatsQuery
jest.mock('../../services/api', () => ({
  ...jest.requireActual('../../services/api'),
  useGetCatsQuery: jest.fn(),
}));

// Создание тестового хранилища
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

describe('Cats Component Tests', () => {
  beforeEach(() => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  test('renders Cats component with grid view', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    expect(screen.getByTestId('cat-grid-view')).toBeInTheDocument();
  });

  test('renders Cats component with carousel view', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cats viewType="carousel" />
      </Provider>
    );

    expect(screen.getByTestId('cat-carousel-view')).toBeInTheDocument();
  });

  test('renders Cats component with list view', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cats viewType="list" />
      </Provider>
    );

    expect(screen.getByTestId('cat-list-view')).toBeInTheDocument();
  });

  test('renders Cats component with cards view', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Cats viewType="cards" />
      </Provider>
    );

    expect(screen.getByTestId('cat-cards-view')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
      refetch: jest.fn(),
    });

    const store = createTestStore();
    render(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: { message: 'Test error' },
      isLoading: false,
      refetch: jest.fn(),
    });

    const store = createTestStore();
    render(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});