import { configureStore } from '@reduxjs/toolkit'; 
import { api } from './api'; 
import fetchMock from 'jest-fetch-mock'; 
import { Provider } from 'react-redux'; 
import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks'; 

// Enable fetchMock to mock fetch requests
fetchMock.enableMocks();

// Function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer, // Add the API reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware), // Add API middleware to handle async actions
  });
};

// Reset mocks before each test
beforeEach(() => {
  fetchMock.resetMocks();
});

// Test suite for API service tests
describe('API service tests', () => {
  // Test case for successful fetch of cats
  test('successful fetch of cats', async () => {
    // Mock data for cats
    const mockCats = [
      { id: '1', url: 'https://example.com/cat1.jpg', width: 500, height: 500 },
      { id: '2', url: 'https://example.com/cat2.jpg', width: 500, height: 500 },
    ];

    // Mock the API response with mock data
    fetchMock.mockResponseOnce(JSON.stringify(mockCats), {
      headers: { 'x-api-key': process.env.REACT_APP_API_KEY as string },
    });

    // Create the test store
    const store = createTestStore();
    // Wrapper component to provide the Redux store to the hook
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    // Render the useQuery hook with the Redux store
    const { result, waitForNextUpdate } = renderHook(() => api.endpoints.getCats.useQuery(10), { wrapper });

    // Wait for the hook to update with the fetched data
    await waitForNextUpdate();

    // Assert that the hook is not loading, is successful, and has the correct data
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockCats);
  });

  // Test case for failed fetch of cats
  test('failed fetch of cats', async () => {
    // Mock the API response to reject with an error
    fetchMock.mockRejectOnce(new Error('API is down'));

    // Create the test store
    const store = createTestStore();
    // Wrapper component to provide the Redux store to the hook
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    // Render the useQuery hook with the Redux store
    const { result, waitForNextUpdate } = renderHook(() => api.endpoints.getCats.useQuery(10), { wrapper });

    // Wait for the hook to update with the error
    await waitForNextUpdate();

    // Assert that the hook is not loading, encountered an error, and the error is defined
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
    expect(result.current.error).toBeDefined();
  });
});