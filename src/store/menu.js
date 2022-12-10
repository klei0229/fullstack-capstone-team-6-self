//this code is for fetching and storing the corresponding menu and its menu items & menu styles 
import axios from 'axios';

const menu = (state = {}, action) => {
  if (action.type === 'SET_MENU') {
    return action.menu;
  }
  if (action.type === 'UPDATE_MENU_ITEMS') {
    return {...state, ...action.menu}
  }
  return state;
};

export const fetchMenu = (menuId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/menu/${menuId}`);
    dispatch({ type: 'SET_MENU', menu: response.data });
  };
};

export const updateMenuItems = (menuId, items, navigate) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/menu/${menuId}`, { items: items });
    dispatch({ type: 'UPDATE_MENU_ITEMS', menu: response.data });
    navigate('/');
  };
};

export default menu;
