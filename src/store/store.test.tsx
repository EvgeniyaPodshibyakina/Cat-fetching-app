import { configureStore } from '@reduxjs/toolkit'; 
import { setupListeners } from '@reduxjs/toolkit/query/react'; 
import { api } from '../services/api'; 
import catsReducer from '../reducers/catSlice'; 
import { store } from './store'; 

describe('Redux Store', () => {
  test('should configure the store with the correct reducers', () => {
  
    const mockStore = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        cats: catsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    expect(store.getState()).toEqual(mockStore.getState());
  });

  test('should set up listeners correctly', () => {
    const dispatch = jest.fn(); 
    expect(() => setupListeners(dispatch)).not.toThrow(); 
  });

  test('should define the RootState and AppDispatch types correctly', () => {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;

    const rootState: RootState = store.getState();
    expect(rootState).toBe(store.getState());

    const appDispatch: AppDispatch = store.dispatch;
    expect(appDispatch).toBe(store.dispatch);
  });

  test('should handle actions correctly with middleware', async () => {
    const testStore = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        cats: catsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    });

    await testStore.dispatch(api.endpoints.getCats.initiate(10));

    const state = testStore.getState();
    expect(state.api.queries['getCats(10)']).toBeDefined();
  });
});