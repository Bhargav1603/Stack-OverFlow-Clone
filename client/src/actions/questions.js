import * as api from '../api';
import { CREATE, UPDATE, FETCH_ALL, DELETE, FETCH_BY_SEARCH, FETCH_QUESTION, START_LOADING, END_LOADING } from '../constants/ActionTypse';
import { success, alerterror } from './alerts';


export const askQuestion = (questionData) => async (dispatch) => {
    try {
        const { data } = await api.askQuestion(questionData);
        dispatch({ type: CREATE, payload: data });
        dispatch(success("Question Created Successfully"))
    } catch (error) {
        dispatch(alerterror("Please Login to post a question"));
        console.log(error);
    }
}

export const getQuestions = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages, total } } = await api.fetchQuestions(page);
        const action = { type: FETCH_ALL, payload: { data, currentPage, numberOfPages, total } };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getQuestionsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchQuestionsBySearch(searchQuery);
        const action = { type: FETCH_BY_SEARCH, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}

export const getQuestionsByTag = (tag) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchQuestionsByTag(tag);
        const action = { type: FETCH_BY_SEARCH, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error)
    }
}

export const getQuestion = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchQuestion(id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const newComment = (commentData, id) => async (dispatch) => {
    try {
        const { data } = await api.newComment(commentData, id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);
        dispatch(success("Comment Posted Successfully"))
    } catch (error) {
        console.log(error);
    }
}

export const newAnswer = (answerData, id) => async (dispatch) => {
    try {
        const { data } = await api.newAnswer(answerData, id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);
        dispatch(success("You have Successfully Answered a Question"))
    } catch (error) {
        console.log(error);
    }
}

export const deleteQuestion = (id, history) => async (dispatch) => {
    try {
        await api.deleteQuestion(id);
        history.push('/');
        dispatch({ type: DELETE, payload: id })

    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = (answer_id, id) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(answer_id, id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);

    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = (comment_id, id) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(comment_id, id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);

    } catch (error) {
        console.log(error);
    }
}

export const updateQuestion = (id, questionData) => async (dispatch) => {
    try {
        const { data } = await api.updateQuestion(id, questionData);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}


export const upVote = (id, answer_id) => async (dispatch) => {
    try {
        const { data } = await api.upVote(id, answer_id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}


export const downVote = (id, answer_id) => async (dispatch) => {
    try {
        const { data } = await api.downVote(id, answer_id);
        const action = { type: FETCH_QUESTION, payload: { question: data } };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
}
