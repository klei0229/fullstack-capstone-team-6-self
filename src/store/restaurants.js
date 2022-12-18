import axios from 'axios';

const restaurants = (state = [], action) => {
  if (action.type === 'SET_RESTAURANTS') {
    return action.restaurants;
  }
  if (action.type === 'CREATE_RESTAURANT') {
    return [...state, action.restaurant];
  }
  return state;
};

export const fetchRestaurants = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/restaurants');
    dispatch({ type: 'SET_RESTAURANTS', restaurants: response.data });
  };
};

export const createRestaurant = (restaurant) => {
  return async (dispatch) => {
    const response = await axios.post('/api/restaurants', restaurant);
    dispatch({ type: 'CREATE_RESTAURANT', restaurant: response.data });
  };
};

export default restaurants;
