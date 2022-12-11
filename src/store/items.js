import axios from 'axios';

const items = (state = [], action) => {
  if (action.type === 'SET_ITEMS') {
    return action.items;
  }
  if (action.type === 'UPDATE_ITEM') {
    return state.map((item) =>
      item.id === action.item.id ? action.item : item
    );
  }
  return state;
};

export const fetchItems = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/items');
    dispatch({ type: 'SET_ITEMS', items: response.data });
  };
};

export const updateItem = (item) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/items/${item.id}`, item);
    dispatch({ type: 'UPDATE_ITEM', item: response.data });
  };
};

export default items;
