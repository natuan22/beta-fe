import produce from "immer";
const initialState = {
    colorText: ''
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === 'beta/GET_COLOR') {
            draft.colorText = payload
        }
    });
};

export default reducer;
