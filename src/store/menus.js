import axios from 'axios';

const menus = (state = [], action) => {
  if (action.type === 'SET_MENUS') {
    return action.menus;
  }
  if (action.type === 'CREATE_MENU') {
    return [...state, action.menu];
  }
  return state;
};

export const fetchMenus = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/menus');
    dispatch({ type: 'SET_MENUS', menus: response.data });
  };
};

export const createMenu = (menu) => {
  return async (dispatch) => {
    const response = await axios.post('/api/menus', menu);
    dispatch({ type: 'CREATE_MENU', menu: response.data });
  };
};

export default menus;
