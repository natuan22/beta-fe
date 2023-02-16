import produce from "immer";
const initialState = {
  dataCarousel: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    
  });
};

export default reducer;
