import { FETCH_TAGS, FETCH_TAG, UPDATE_TAG, START_LOADING, END_LOADING } from "../constants/ActionTypse";

export default (state = { isLoading: true, tags: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_TAGS:
            return {
                ...state,
                tags: action.payload
            };
        case FETCH_TAG:
            return { ...state, tag: action.payload.tag };
        case UPDATE_TAG:
            return { ...state, tags: state.tags.map((tag) => tag._id === action.payload._id ? action.payload : tag) };
        default:
            return state;
    }

}