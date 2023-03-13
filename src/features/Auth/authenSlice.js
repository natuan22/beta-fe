import produce from "immer";
import * as authenTypes from "./utils/constant";
const initialState = {
  userData : null ,
  loginMessage: ''
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if(type === authenTypes.USER_LOGIN){
      draft.userData = payload
    }
    if(type === authenTypes.LOGIN_FAIL){
      draft.loginMessage = payload
    }
  });
};

export default reducer;
