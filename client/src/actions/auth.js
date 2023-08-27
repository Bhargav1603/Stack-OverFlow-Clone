import * as api from '../api';
import { AUTH, START_LOADING, END_LOADING } from '../constants/ActionTypse';
import { success, alerterror } from './alerts';

export const signin = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        history.push('/');
        dispatch(success(`Welcome ${data.result.name}!`))
    } catch (error) {
        dispatch({ type: END_LOADING });
        dispatch(alerterror("Username or password is incorrect"));
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        dispatch({ type: END_LOADING });
        history.push('/');
        dispatch(success(`Welcome ${data.result.name}!`))
    } catch (error) {
        dispatch({ type: END_LOADING });
        dispatch(alerterror("Passwords Don't Match"));
        console.log(error);
    }
}