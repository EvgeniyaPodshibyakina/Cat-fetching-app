import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICat } from '../models/ICat';
import { api } from '../services/api';

export interface CatsState {
  cats: ICat[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const initialState: CatsState = {
  cats: [],
  status: 'idle',
  error: null,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getCats.matchPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(api.endpoints.getCats.matchFulfilled, 
        (state, action: PayloadAction<ICat[]>) => {
        state.status = 'succeeded';
        state.cats = action.payload;
      })
      .addMatcher(api.endpoints.getCats.matchRejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch cats';
      });
  },
});

export default catsSlice.reducer;