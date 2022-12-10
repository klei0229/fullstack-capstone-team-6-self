//this code is for fetchinga nd storing the corresponding menu and its menu items & menu styles 
import axios from 'axios';

const menu = (state = {}, action) => {
  if (action.type === 'SET_MENU') {
    return action.menu;
  }
  return state;
};

export const fetchMenu = (menuId) => {
  return async (dispatch) => {
    console.log('fetch');
    console.log(menuId);
    const response = await axios.get(`/api/menu/${menuId}`);
    console.log('fetch2');
    console.log(response);
    dispatch({ type: 'SET_MENU', menu: response.data });
  };
};

export default menu;
