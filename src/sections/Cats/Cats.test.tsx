import React, { Suspense } from 'react'; 
import { render, screen, waitFor } from '@testing-library/react'; 
import '@testing-library/jest-dom'; 
import Cats from './Cats'; 
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; 
import { api } from '../../services/api'; 
import catsReducer from '../../reducers/catSlice'; 
import { useGetCatsQuery } from '../../services/api'; 

// Mock the useGetCatsQuery hook
jest.mock('../../services/api', () => ({
  ...jest.requireActual('../../services/api'),
  useGetCatsQuery: jest.fn(),
}));

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

describe('Cats Component Tests', () => {
  // Mock return value for useGetCatsQuery before each test
  beforeEach(() => {
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [{ id: '1', url: 'test-url' }],
      error: null,
      isLoading: false,
      refetch: jest.fn(),
    });
  });

  // Helper function to render components with Suspense and Provider
  const renderWithSuspense = (component: JSX.Element) => {
    return render(
      <Suspense fallback={<div>Loading...</div>}>
        {component}
      </Suspense>
    );
  };

  // Test case to check if Cats component renders with grid view
  test('renders Cats component with grid view', async () => {
    // Create a test store
    const store = createTestStore(); 

    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    // Wait for the grid view component to be in the document
    await waitFor(() => expect(screen.getByTestId('cat-grid-view')).toBeInTheDocument());
  });

  // Test case to check if Cats component renders with carousel view
  test('renders Cats component with carousel view', async () => {
    const store = createTestStore(); // Create a test store

    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="carousel" />
      </Provider>
    );

    // Wait for the carousel view component to be in the document
    await waitFor(() => expect(screen.getByTestId('cat-carousel-view')).toBeInTheDocument());
  });

  // Test case to check if Cats component renders with list view
  test('renders Cats component with list view', async () => {
    // Create a test store
    const store = createTestStore(); 
    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="list" />
      </Provider>
    );

    // Wait for the list view component to be in the document
    await waitFor(() => expect(screen.getByTestId('cat-list-view')).toBeInTheDocument());
  });

  // Test case to check if Cats component renders with cards view
  test('renders Cats component with cards view', async () => {
    // Create a test store
    const store = createTestStore(); 

    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="cards" />
      </Provider>
    );

    // Wait for the cards view component to be in the document
    await waitFor(() => expect(screen.getByTestId('cat-cards-view')).toBeInTheDocument());
  });

  // Test case to check if Cats component renders loading state
  test('renders loading state', () => {
    // Mock return value for useGetCatsQuery to simulate loading state
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
      refetch: jest.fn(),
    });
    // Create a test store
    const store = createTestStore(); 
    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    // Check if loading state is rendered
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  // Test case to check if Cats component renders error state
  test('renders error state', () => {
    // Mock return value for useGetCatsQuery to simulate error state
    (useGetCatsQuery as jest.Mock).mockReturnValue({
      data: [],
      error: { message: 'Test error' },
      isLoading: false,
      refetch: jest.fn(),
    });
    // Create a test store
    const store = createTestStore(); 
    renderWithSuspense(
      <Provider store={store}>
        <Cats viewType="grid" />
      </Provider>
    );

    // Check if error state is rendered
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});