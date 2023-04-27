import produce from "immer";
const initialState = {
    colorText: '',
    colorTheme: ''
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === 'beta/GET_COLOR') {
            draft.colorText = payload
        }
        if (type === 'beta/GET_THEME') {
            draft.colorTheme = payload
        }
    });
};

export default reducer;
