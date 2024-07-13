import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';
import './CatList.scss'


export const CatList:React.FC = () => {
  const { cats } = useAppSelector((state) => state.cats) || [];
  return (
    <div className="CatList" data-testid="cat-list-view">
        <div className="list-wrapper">
          {cats.map((cat) => (
            <div key={cat.id} className="list-container">
              <div className="img-wrapper">
                <img src={cat.url} alt="cat" />
              </div>
              <div className="text">
                <p>There might have been some big 
                  paragraph about this cat but there 
                  is nothing on this api call except for the sizes of the picture:</p>
                <p>{cat.width}</p>
                <p>{cat.height}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default CatList