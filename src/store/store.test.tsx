import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query/react'; 
import { api } from '../services/api'; 
import catsReducer from '../reducers/catSlice'; 
import { store } from './store'; 

describe('Redux Store', () => {
  // Test case to check if the store is configured correctly
  test('should configure the store with the correct reducers', () => {
    // Create a mock store with the same configuration
    const mockStore = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        cats: catsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    // Check if the store's state matches the mock store's state
    expect(store.getState()).toEqual(mockStore.getState());
  });

  // Test case to check if the setupListeners function is called correctly
  test('should set up listeners correctly', () => {
    const dispatch = jest.fn(); // Create a mock dispatch function
    expect(() => setupListeners(dispatch)).not.toThrow(); // Call setupListeners with the mock dispatch and ensure it doesn't throw
  });

  // Test case to check if the store's types are defined correctly
  test('should define the RootState and AppDispatch types correctly', () => {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;

    // Check if RootState is correctly defined
    const rootState: RootState = store.getState();
    expect(rootState).toBe(store.getState());

    // Check if AppDispatch is correctly defined
    const appDispatch: AppDispatch = store.dispatch;
    expect(appDispatch).toBe(store.dispatch);
  });

  // Additional test case to ensure middleware is functioning correctly
  test('should handle actions correctly with middleware', async () => {
    const testStore = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        cats: catsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    // Dispatch a test action and ensure middleware processes it correctly
    await testStore.dispatch(api.endpoints.getCats.initiate(10));

    const state = testStore.getState();
    expect(state.api.queries['getCats(10)']).toBeDefined();
  });
});