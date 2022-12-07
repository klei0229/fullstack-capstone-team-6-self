import axios from "axios";

const menuPreferences = (state = {
    restaurantNameFontSize:55,
    categoryNameFontSize:24,
    itemNameFontSize:18,
    descriptionNameFontSize:18,
    fontFamily:'verdana'
}, action) => {
  if (action.type === "SET_MENU_PREFERENCES") {
    return action.data;
  }

  return state;
};

export const setMenuPreferences = (menuPreferencesObj) => {
  return async (dispatch) => {
    dispatch({ type: "SET_MENU_PREFERENCES", data: menuPreferencesObj });
  };
};


export default menuPreferences;
