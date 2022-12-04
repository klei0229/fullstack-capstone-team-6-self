import axios from 'axios';

const menus = (state = [], action) => {
  if (action.type === 'SET_MENUS') {
    return action.menus;
  }
  return state;
};

export const fetchMenus = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/menus');
    dispatch({ type: 'SET_MENUS', menus: response.data });
  };
};

export default menus;
