import produce from "immer";
const initialState = {
  banners: [],
  movies: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "SET_BANNERS") {
      draft.banners = payload;
    }
    if (type === "SET_MOVIES") {
      draft.movies = payload;
    }
  });
};

export default reducer;
