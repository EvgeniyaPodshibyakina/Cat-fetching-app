import React, { useState } from 'react';
import Cats from './sections/Cats/Cats';
import { ButtonGroup, Container, Button } from 'react-bootstrap';
import { ViewType } from './types/ViewType';
import './App.scss';


const App: React.FC = () => {
  const [viewType, setViewType] = useState<ViewType>('grid');

  return (
    <Container className='App'>
      <h1 className="header">Cat Photos</h1>
      <ButtonGroup className="mb-4">
        <Button onClick={() => setViewType('grid')}>Grid</Button>
        <Button onClick={() => setViewType('carousel')}>Carousel</Button>
        <Button onClick={() => setViewType('list')}>List</Button>
        <Button onClick={() => setViewType('cards')}>Cards</Button>
      </ButtonGroup>
      <Cats viewType={viewType} />
    </Container>
  );
};


export default App;