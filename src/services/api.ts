import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ICat} from '../models/ICat'

const apiKey: string = process.env.REACT_APP_API_KEY as string;

 export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
   baseUrl: 'https://api.thecatapi.com/v1/', 
   prepareHeaders: (headers) => {
    headers.set('x-api-key', apiKey);
    return headers;
  },
}),
  endpoints: (builder) => ({
    getCats: builder.query<ICat[], number>({
      query: (limit = 10) => {
        console.log(`images/search?limit=${limit}`); // Log the query
        return `images/search?limit=${limit}`;
      },
    }),
  }),
});

export const { useGetCatsQuery } = api; 


