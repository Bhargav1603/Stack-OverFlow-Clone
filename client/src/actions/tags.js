import * as api from '../api';
import { FETCH_TAGS, FETCH_TAG, UPDATE_TAG, START_LOADING, END_LOADING } from '../constants/ActionTypse';

export const newTag = (tagData) => async (dispatch) => {
    try {
        await api.newTag(tagData);
    } catch (error) {
        console.log(error);
    }
}

export const gettags = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchtags();
        const action = { type: FETCH_TAGS, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
}

export const getTag = (tag) => async (dispatch) => {
    try {
        const { data } = await api.fetchTag(tag);
        const action = { type: FETCH_TAG, payload: { tag: data } };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateTag = (tag) => async (dispatch) => {
    try {
        const { data } = await api.updateTag(tag);
        dispatch({ type: UPDATE_TAG, payload: data });
    } catch (error) {
        console.log(error);
    }
}