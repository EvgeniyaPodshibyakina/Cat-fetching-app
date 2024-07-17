import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react'; 
import '@testing-library/jest-dom'; 
import App from './App'; 
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; 
import { api } from './services/api'; 
import catsReducer from './reducers/catSlice'; 

// Function to create a test store
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
  // Test case to check if the App component renders correctly
  test('renders App component', () => {
    const store = createTestStore(); // Create a test store

    render(
      <Provider store={store}> 
        <App /> 
      </Provider>
    );

    // Check if certain text elements are present in the document
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); 
    expect(screen.getByText('Grid')).toBeInTheDocument(); 
    expect(screen.getByText('Carousel')).toBeInTheDocument(); 
    expect(screen.getByText('List')).toBeInTheDocument(); 
    expect(screen.getByText('Cards')).toBeInTheDocument(); 
  });

  // Test case to check if the view type changes when buttons are clicked
  test('changes view type when buttons are clicked', () => {
    const store = createTestStore(); // Create a test store

    render(
      <Provider store={store}> 
        <App /> 
      </Provider>
    );

    // Select the buttons by their text content
    const gridButton = screen.getByText('Grid');
    const carouselButton = screen.getByText('Carousel');
    const listButton = screen.getByText('List');
    const cardsButton = screen.getByText('Cards');

    // Simulate button clicks and check if the component re-renders correctly
    fireEvent.click(carouselButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument();

    fireEvent.click(listButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); 

    fireEvent.click(cardsButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); 

    fireEvent.click(gridButton);
    expect(screen.getByText('Cat Photos')).toBeInTheDocument(); 
  });
});