import React from 'react'; 
import { render } from '@testing-library/react'; 
import { Provider } from 'react-redux'; 
import configureMockStore from 'redux-mock-store'; 
import CatCards from './CatCards'; 
import { useAppSelector } from '../../hooks/reduxHooks'; 
import { ICat } from '../../models/ICat'; 

// Mock the useAppSelector hook to control the returned state in tests
jest.mock('../../hooks/reduxHooks', () => ({
  useAppSelector: jest.fn(),
}));

// Create a mock store using redux-mock-store
const mockStore = configureMockStore();

describe('CatCards Component Tests', () => {
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

  // Test case to check if CatCards component renders with cats
  it('renders CatCards component with cats', () => {
    // Render the CatCards component wrapped with the Redux Provider and mock store
    const { getByTestId } = render(
      <Provider store={store}>
        <CatCards />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catCardsView = getByTestId('cat-cards-view');

    // Assert that the CatCards component is rendered and the element is present in the document
    expect(catCardsView).toBeInTheDocument();
  });

  // Test case to check if CatCards component renders without cats
  it('renders CatCards component with no cats', () => {
    // Update the mock return value of useAppSelector to simulate an empty cats array
    (useAppSelector as jest.Mock).mockReturnValue({ cats: [], status: 'succeeded', error: null });

    // Render the CatCards component wrapped with the Redux Provider and mock store
    const { getByTestId } = render(
      <Provider store={store}>
        <CatCards />
      </Provider>
    );

    // Select the element by data-testid attribute
    const catCardsView = getByTestId('cat-cards-view');

    // Assert that the CatCards component is rendered and the element is present in the document
    expect(catCardsView).toBeInTheDocument();
  });
});