import produce from "immer";
import * as actionType from './constant'
const initialState = {
  dataCarousel: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if(type === actionType.UPDATE_DATA_CAROUSEL){
      draft.dataCarousel = payload
    }
  });
};

export default reducer;
