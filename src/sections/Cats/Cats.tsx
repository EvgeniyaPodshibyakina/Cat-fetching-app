import React, { useEffect } from 'react';
import { useGetCatsQuery } from '../../services/api';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { CatCards } from '../../components/CatCards/CatCards';
import { CatGrid } from '../../components/CatGrid/CatGrid';
import { CatCarousel } from '../../components/CatCarousel/CatCarousel';
import { CatList } from '../../components/CatList/CatList';
import { CatsProps } from './types/CatsProps';

const Cats: React.FC<CatsProps> = ({ viewType }) => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCatsQuery(10); // Fetch 10 cat images
  const status = useAppSelector((state) => state.cats.status);  
  console.log(status);
  
  console.log(data);
  

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
      content = <CatCarousel />;
      break;
    case 'list':
      content = <CatList />;
      break;
    case 'cards':
      content = <CatCards />;
      break;
    case 'grid':
    default:
      content = <CatGrid />;
      break;
  }

  return content;
};

export default Cats;