import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Palace'},
    {id: 2, name: 'Pizza Palace'},
  ];
  let loadRestaurants;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      restaurants,
      ...propOverrides,
    };

    loadRestaurants = props.loadRestaurants;

    context = render(<RestaurantList {...props} />);
  };

  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe('when loading succeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('displays the restaurants', () => {
      const {queryByText} = context;

      expect(queryByText('Sushi Palace')).not.toBeNull();
      expect(queryByText('Pizza Palace')).not.toBeNull();
    });

    it('does not display the loading indicator while not loading', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('does not display the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).toBeNull();
    });
  });

  describe('when loading failes', () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });

    it('display the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurants could not be loaded.')).not.toBeNull();
    });
  });

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });
});
