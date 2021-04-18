import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loadRestaurants} from '../restaurants/actions';
import restaurantReducer from '../restaurants/reducers';

describe('restaurants', () => {
  describe('initially', () => {
    let store;

    beforeEach(() => {
      const initialState = {};

      store = createStore(
        restaurantReducer,
        initialState,
        applyMiddleware(thunk),
      );
    });

    it('does not have the loading flag set', () => {
      expect(store.getState().loading).toEqual(false);
    });

    it('does not have the error flag set', () => {
      expect(store.getState().loadError).toEqual(false);
    });
  });
  describe('loadRestaurants action', () => {
    describe('when loading succeeds', () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      let store;

      /*
       * Documented behavior:
       * if we want Jest to wait for a promise in a beforeEach block
       * to resolve, we should return it.
       */
      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        const initialState = {records: []};

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('stores the restaurants', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });

    describe('when loading failes', () => {
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject(),
        };

        const initialState = {};

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('sets an error flag', () => {
        expect(store.getState().loadError).toEqual(true);
      });
    });

    describe('while loading', () => {
      let store;

      beforeEach(() => {
        const api = {loadRestaurants: () => new Promise(() => {})};

        const initialState = {loadError: true};

        store = createStore(
          restaurantReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('sets a loading flag', () => {
        expect(store.getState().loading).toEqual(true);
      });

      it('clears the error flag', () => {
        expect(store.getState().loadError).toEqual(false);
      });
    });
  });
});
