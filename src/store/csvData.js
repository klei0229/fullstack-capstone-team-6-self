import axios from "axios";

const csvData = (state =[], action) => {
  if (action.type === "SET_CSV_DATA") {
    return action.csvData;
  }

  return state;
};

export const setCsvData = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SET_CSV_DATA", csvData: data });
  };
};


export default csvData;
