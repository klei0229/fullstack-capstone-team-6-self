import axios from 'axios';

const restaurants = (state = [], action) => {
  if (action.type === 'SET_RESTAURANTS') {
    return action.restaurants;
  }
  return state;
};

export const fetchRestaurants = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/restaurants');
    dispatch({ type: 'SET_RESTAURANTS', restaurants: response.data });
  };
};

export default restaurants;
