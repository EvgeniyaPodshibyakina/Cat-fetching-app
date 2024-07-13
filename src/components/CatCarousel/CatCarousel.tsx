import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector } from '../../hooks/reduxHooks';
import './CatCarousel.scss';

export const CatCarousel:React.FC = () => {
  const { cats } = useAppSelector((state) => state.cats) || [];
  return (
    <Carousel className='CatCarousel' data-testid="cat-carousel-view">
        {cats.map((cat) => (
          <Carousel.Item key={cat.id}>
            <div className="carousel-img-container">
              <img
                className="carousel-img"
                src={cat.url}
                alt="cat"
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
  )
}
