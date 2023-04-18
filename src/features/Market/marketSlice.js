import produce from "immer";
import * as actionType from "./utils/constant";
const initialState = {
    tableThanhKhoanData: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
   
  });
};

export default reducer;
