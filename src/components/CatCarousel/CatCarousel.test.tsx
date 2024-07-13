import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { CatCarousel } from './CatCarousel';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ICat } from '../../models/ICat';

// Mock the useAppSelector hook
jest.mock('../../hooks/reduxHooks', () => ({
  useAppSelector: jest.fn(),
}));

const mockStore = configureMockStore();

describe('CatCarousel Component Tests', () => {
  let store: ReturnType<typeof mockStore>;
  let mockCats: ICat[];

  beforeEach(() => {
    mockCats = [
      { id: '1', url: 'http://example.com/cat1.jpg', width: 600, height: 400, breeds: [], favourite: {} },
      { id: '2', url: 'http://example.com/cat2.jpg', width: 600, height: 400, breeds: [], favourite: {} },
    ];

    store = mockStore({
      cats: {
        cats: mockCats,
        status: 'succeeded',
        error: null,
      },
    });

    (useAppSelector as jest.Mock).mockReturnValue({ cats: mockCats, status: 'succeeded', error: null });
  });

  it('renders CatCarousel component with cats', () => {
    const { getByTestId, getAllByRole } = render(
      <Provider store={store}>
        <CatCarousel />
      </Provider>
    );
    const catCarouselView = getByTestId('cat-carousel-view');
    const images = getAllByRole('img');

    expect(catCarouselView).toBeInTheDocument();
    expect(images.length).toBe(2);  // Adjust based on the number of cats in mockCats
  });

  it('renders CatCarousel component with no cats', () => {
    (useAppSelector as jest.Mock).mockReturnValue({ cats: [], status: 'succeeded', error: null });

    const { getByTestId, queryAllByRole } = render(
      <Provider store={store}>
        <CatCarousel />
      </Provider>
    );
    const catCarouselView = getByTestId('cat-carousel-view');
    const images = queryAllByRole('img');

    expect(catCarouselView).toBeInTheDocument();
    expect(images.length).toBe(0);
  });
});