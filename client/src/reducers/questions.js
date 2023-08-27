import { CREATE, FETCH_ALL, UPDATE, DELETE, FETCH_QUESTION, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/ActionTypse";

export default (state = { isLoading: true, questions: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case CREATE:
            return { ...state, questions: [...state.questions, action.payload] };
        case FETCH_ALL:
            return {
                ...state,
                questions: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                total: action.payload.total
            };
        case FETCH_QUESTION:
            return { ...state, question: action.payload.question };
        case FETCH_BY_SEARCH:
            return { ...state, questions: action.payload };
        case DELETE:
            return { ...state, questions: state.questions.filter((question) => question._id !== action.payload) };
        case UPDATE:
            return { ...state, questions: state.questions.map((question) => question._id === action.payload._id ? action.payload : question) };
        default:
            return state;
    }

}