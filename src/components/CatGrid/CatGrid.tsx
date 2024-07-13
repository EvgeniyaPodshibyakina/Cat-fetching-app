import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';
import './CatGrid.scss'


 const CatGrid:React.FC = () => {
  const { cats } = useAppSelector((state) => state.cats) || [];
  return (
    <div className="CatGrid" data-testid="cat-grid-view">
    {cats.map((cat) => (
      <div key={cat.id} className="col">
        <img 
          src={cat.url} 
          alt="cat" 
        />
      </div>
    ))}
  </div>
  )
}
export default CatGrid