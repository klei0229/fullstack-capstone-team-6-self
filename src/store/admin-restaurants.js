import axios from 'axios';

const adminRestaurants = (state = [], action) => {
  if (action.type === 'SET_ADMIN_RESTAURANTS') {
    return action.adminRestaurants;
  }
  if (action.type === 'CREATE_RESTAURANT') {
    return [...state, action.adminRestaurant];
  }
  return state;
};

export const fetchAdminRestaurants = (auth) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/admin-restaurants/${auth.id}`);
    dispatch({
      type: 'SET_ADMIN_RESTAURANTS',
      adminRestaurants: response.data,
    });
  };
};

export const createRestaurant = (restaurant) => {
  return async (dispatch) => {
    const response = await axios.post('/api/admin-restaurants', restaurant);
    dispatch({ type: 'CREATE_RESTAURANT', adminRestaurant: response.data });
  };
};

export default adminRestaurants;
