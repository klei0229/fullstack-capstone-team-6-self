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
    console.log('fetched menus');
    const response = await axios.get('/api/menus');
    console.log(response);
    dispatch({ type: 'SET_MENUS', menus: response.data });
  };
};

export const createMenu = (menu, items) => {
  return async (dispatch) => {
    const response = await axios.post('/api/menus', menu);

    console.log(items);

    items.forEach(async (item) => {
      try {
        const newItem = { ...item, menuId: response.data.id };
        console.log(newItem);
        const responseItem = await axios.post('/api/items', newItem);
      } catch (ex) {
        console.log(ex);
      }
    });

    dispatch({ type: 'CREATE_MENU', menu: response.data });
  };
};

export default menus;
