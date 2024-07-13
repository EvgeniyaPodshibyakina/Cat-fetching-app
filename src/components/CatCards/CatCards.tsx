import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';
import './CatCards.scss'

export const CatCards:React.FC = () => {
    const { cats } = useAppSelector((state) => state.cats) || [];
  return (
<div className="CatCards" data-testid="cat-cards-view">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cats.map((cat) => (
            <div key={cat.id} className="">
              <div className="card h-100">
                <img src={cat.url} className="card-img-top" alt="cat" />
                <div className="card-body">
                  <h5 className="card-title">Cat</h5>
                  <p className="card-text">{cat.height}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

