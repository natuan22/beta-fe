import produce from "immer";
import * as actionType from './constant'
const initialState = {
  dataCarousel: {},
  dataBarChartRight: {},
  dataBarChartLeft: {},
  dataTableDetail: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if(type === actionType.UPDATE_DATA_CAROUSEL){
      draft.dataCarousel = payload
    }
    if(type === actionType.UPDATE_DATA_BARCHART_RIGHT){
      draft.dataBarChartRight = payload
    }
    if(type === actionType.UPDATE_DATA_BARCHART_LEFT){
       draft.dataBarChartLeft = payload
    }
    if(type === actionType.UPDATE_DATA_TABLEDETAIL){
      draft.dataTableDetail = payload
    }
  });
};

export default reducer;
