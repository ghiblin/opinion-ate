import {Provider} from 'react-redux';
import RestaurantScreen from './components/RestaurantScreen';
import store from './store';

const App = () => (
  <Provider store={store}>
    <RestaurantScreen />
  </Provider>
);

export default App;
