import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import fetchMock from 'jest-fetch-mock';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

fetchMock.enableMocks();

const createTestStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('API service tests', () => {
  test('successful fetch of cats', async () => {
    const mockCats = [
      { id: '1', url: 'https://example.com/cat1.jpg', width: 500, height: 500 },
      { id: '2', url: 'https://example.com/cat2.jpg', width: 500, height: 500 },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockCats), {
      headers: { 'x-api-key': process.env.REACT_APP_API_KEY as string },
    });

    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => api.endpoints.getCats.useQuery(10), { wrapper });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isSuccess).toBeTruthy();
    expect(result.current.data).toEqual(mockCats);
  });

  test('failed fetch of cats', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    const store = createTestStore();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => api.endpoints.getCats.useQuery(10), { wrapper });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();
    expect(result.current.error).toBeDefined();
  });
});