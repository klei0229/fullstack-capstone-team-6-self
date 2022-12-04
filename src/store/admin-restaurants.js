import axios from 'axios';

const adminRestaurants = (state = [], action) => {
  if (action.type === 'SET_ADMIN_RESTAURANTS') {
    return action.adminRestaurants;
  }
  return state;
};

export const fetchAdminRestaurants = (auth) => {
  console.log('auth from store thunk: ', auth)
  return async (dispatch) => {
    const response = await axios.get(`/api/admin-restaurants/${auth.id}`);
    dispatch({
      type: 'SET_ADMIN_RESTAURANTS',
      adminRestaurants: response.data,
    });
  };
};

export default adminRestaurants;
