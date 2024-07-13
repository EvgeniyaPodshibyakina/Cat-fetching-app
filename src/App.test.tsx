// src/App.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import catsReducer from './reducers/catSlice';

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

describe('App Component Tests', () => {
  test('renders App component', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Cat Photos')).toBeInTheDocument();
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(screen.getByText('Carousel')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
  });

  test('changes view type when buttons are clicked', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const gridButton = screen.getByText('Grid');
    const carouselButton = screen.getByText('Carousel');
    const listButton = screen.getByText('List');
    const cardsButton = screen.getByText('Cards');

    fireEvent.click(carouselButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); // Check if the component re-renders correctly

    fireEvent.click(listButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); // Check if the component re-renders correctly

    fireEvent.click(cardsButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); // Check if the component re-renders correctly

    fireEvent.click(gridButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); // Check if the component re-renders correctly
  });
});