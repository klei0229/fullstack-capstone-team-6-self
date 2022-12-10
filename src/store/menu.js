//this code is for fetching and storing the corresponding menu and its menu items & menu styles
import axios from 'axios';

const menu = (state = {}, action) => {
  if (action.type === 'SET_MENU') {
    return action.menu;
  }
  if (action.type === 'UPDATE_MENU_ITEMS') {
    return { ...state, ...action.menu };
  }
  return state;
};

export const fetchMenu = (menuId) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/menu/${menuId}`);
    dispatch({ type: 'SET_MENU', menu: response.data });
  };
};

export const updateMenuItems = (menu, items, navigate) => {
  console.log('UPDATE MENU ITEMS: items === ', items);
  return async (dispatch) => {
    const response = await axios.put(`/api/menu/${menu.id}`, {
      ...menu,
      items: items,
    });
    dispatch({ type: 'UPDATE_MENU_ITEMS', menu: response.data });
    navigate('/');
  };
};

export default menu;
