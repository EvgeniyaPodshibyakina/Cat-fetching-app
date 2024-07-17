import React from 'react'; 
import { render } from '@testing-library/react'; 
import { Provider } from 'react-redux'; 
import configureMockStore from 'redux-mock-store'; 
import CatCarousel from './CatCarousel'; 
import { useAppSelector } from '../../hooks/reduxHooks'; 
import { ICat } from '../../models/ICat'; 

// Mock the useAppSelector hook to control the returned state in tests
jest.mock('../../hooks/reduxHooks', () => ({
  useAppSelector: jest.fn(),
}));

// Create a mock store using redux-mock-store
const mockStore = configureMockStore();

describe('CatCarousel Component Tests', () => {
  // Declare variables for the store and mock cat data
  let store: ReturnType<typeof mockStore>;
  let mockCats: ICat[];

  // beforeEach runs before each test to set up the mock data and store
  beforeEach(() => {
    // Define mock cat data
    mockCats = [
      { id: '1', url: 'http://example.com/cat1.jpg', width: 600, height: 400, breeds: [], favourite: {} },
      { id: '2', url: 'http://example.com/cat2.jpg', width: 600, height: 400, breeds: [], favourite: {} },
    ];

    // Create the mock store with an initial state
    store = mockStore({
      cats: {
        cats: mockCats,
        status: 'succeeded',
        error: null,
      },
    });

    // Mock useAppSelector to return the mock state
    (useAppSelector as jest.Mock).mockReturnValue({ cats: mockCats, status: 'succeeded', error: null });
  });

  // Test case to check if CatCarousel component renders with cats
  it('renders CatCarousel component with cats', () => {
    // Render the CatCarousel component wrapped with the Redux Provider and mock store
    const { getByTestId, getAllByRole } = render(
      <Provider store={store}>
        <CatCarousel />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catCarouselView = getByTestId('cat-carousel-view');
    // Select all image elements by their role
    const images = getAllByRole('img');

    // Assert that the CatCarousel component is rendered and the element is present in the document
    expect(catCarouselView).toBeInTheDocument();
    // Assert that the number of image elements matches the number of mock cats
    expect(images.length).toBe(2);  // Adjust based on the number of cats in mockCats
  });

  // Test case to check if CatCarousel component renders without cats
  it('renders CatCarousel component with no cats', () => {
    // Update the mock return value of useAppSelector to simulate an empty cats array
    (useAppSelector as jest.Mock).mockReturnValue({ cats: [], status: 'succeeded', error: null });

    // Render the CatCarousel component wrapped with the Redux Provider and mock store
    const { getByTestId, queryAllByRole } = render(
      <Provider store={store}>
        <CatCarousel />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catCarouselView = getByTestId('cat-carousel-view');
    // Select all image elements by their role
    const images = queryAllByRole('img');

    // Assert that the CatCarousel component is rendered and the element is present in the document
    expect(catCarouselView).toBeInTheDocument();
    // Assert that there are no image elements when no cats are present
    expect(images.length).toBe(0);
  });
});