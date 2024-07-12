import produce from "immer";
import { analysisCenterType } from "./utils/constant";

const initialState = {

};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {

  });
};

export default reducer;
