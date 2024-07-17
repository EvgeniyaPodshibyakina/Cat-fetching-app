import React from 'react'; 
import { render } from '@testing-library/react'; 
import { Provider } from 'react-redux'; 
import configureMockStore from 'redux-mock-store'; 
import CatList from './CatList'; 
import { useAppSelector } from '../../hooks/reduxHooks'; 
import { ICat } from '../../models/ICat'; 

// Mock the useAppSelector hook to control the returned state in tests
jest.mock('../../hooks/reduxHooks', () => ({
  useAppSelector: jest.fn(),
}));

// Create a mock store using redux-mock-store
const mockStore = configureMockStore();

describe('CatList Component Tests', () => {
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

  // Test case to check if CatList component renders with cats
  it('renders CatList component with cats', () => {
    // Render the CatList component wrapped with the Redux Provider and mock store
    const { getByTestId, getAllByAltText } = render(
      <Provider store={store}>
        <CatList />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catListView = getByTestId('cat-list-view');
    // Select all image elements by their alt text
    const images = getAllByAltText('cat');

    // Assert that the CatList component is rendered and the element is present in the document
    expect(catListView).toBeInTheDocument();
    // Assert that the number of image elements matches the number of mock cats
    expect(images.length).toBe(2);  // Adjust based on the number of cats in mockCats
  });

  // Test case to check if CatList component renders without cats
  it('renders CatList component with no cats', () => {
    // Update the mock return value of useAppSelector to simulate an empty cats array
    (useAppSelector as jest.Mock).mockReturnValue({ cats: [], status: 'succeeded', error: null });

    // Render the CatList component wrapped with the Redux Provider and mock store
    const { getByTestId, queryAllByAltText } = render(
      <Provider store={store}>
        <CatList />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catListView = getByTestId('cat-list-view');
    // Select all image elements by their alt text
    const images = queryAllByAltText('cat');

    // Assert that the CatList component is rendered and the element is present in the document
    expect(catListView).toBeInTheDocument();
    // Assert that there are no image elements when no cats are present
    expect(images.length).toBe(0);
  });
});