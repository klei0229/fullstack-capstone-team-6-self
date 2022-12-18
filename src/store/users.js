import axios from 'axios';

const users = (state = [], action) => {
  if (action.type === 'SET_USERS') {
    return action.users;
  }

  if (action.type === 'ADD_USER') {
    return [...state, action.user];
  }
  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/users');
    dispatch({ type: 'SET_USERS', users: response.data });
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    const response = await axios.post('/api/users', user);
    dispatch({ type: 'ADD_USER', user: response.data });
  };
};

export default users;
