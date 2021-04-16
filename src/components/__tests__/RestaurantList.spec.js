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

  it('displays the restaurants', () => {
    renderWithProps();
    const {queryByText} = context;

    expect(queryByText('Sushi Palace')).not.toBeNull();
    expect(queryByText('Pizza Palace')).not.toBeNull();
  });

  it('displays the loading indicator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  it('does not display the loading indicator while not loading', () => {
    renderWithProps({loading: false});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).toBeNull();
  });
});
