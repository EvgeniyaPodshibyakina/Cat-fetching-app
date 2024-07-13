import React, { lazy, Suspense ,useEffect } from 'react';
import { useGetCatsQuery } from '../../services/api';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { CatsProps } from './types/CatsProps';
const CatCards = lazy(() => import('../../components/CatCards/CatCards'));
const CatGrid = lazy(() => import('../../components/CatGrid/CatGrid'));
const CatCarousel = lazy(() => import('../../components/CatCarousel/CatCarousel'));
const CatList = lazy(() => import('../../components/CatList/CatList'));

const Cats: React.FC<CatsProps> = ({ viewType }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCatsQuery(10); // Fetch 10 cat images
  const status = useAppSelector((state) => state.cats.status);  
  

  useEffect(() => {
    if (data) {
      dispatch({ type: 'cats/getCats/fulfilled', payload: data });
    }
  }, [data, dispatch]);

  if (isLoading || status === 'loading') return <div>Loading...</div>;
  
  if (error || status === 'failed') {
    return (
      <div>
        Error: {error && 'status' in error 
          ? 
        `Status: ${error.status}, Data: ${error.data}` 
          : 
        error?.message || 'Error occurred.'}
      </div>
    );
  }

  let content;
  switch (viewType) {
    case 'carousel':
      content = (
        <Suspense fallback={<div>Loading...</div>}>
          <CatCarousel />
        </Suspense>
      );
      break;
    case 'list':
      content = (
        <Suspense fallback={<div>Loading...</div>}>
          <CatList />
        </Suspense>
      );
      break;
    case 'cards':
      content = (
        <Suspense fallback={<div>Loading...</div>}>
          <CatCards />
        </Suspense>
      );
      break;
    case 'grid':
    default:
      content = (
        <Suspense fallback={<div>Loading...</div>}>
          <CatGrid />
        </Suspense>
      );
      break;
  }

  return content;
};

export default Cats;