import produce from "immer";
import {marketType} from "./utils/constant";
const initialState = {
    tableThanhKhoanData: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if(type === marketType.FETCH_DATA_TABLE_THANH_KHOAN){
      draft.tableThanhKhoanData = payload
    }
  });
};

export default reducer;
