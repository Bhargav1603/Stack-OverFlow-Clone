import { combineReducers } from 'redux';
import Auth from './auth';
import questions from './questions';
import tags from './tags';
import { alerts } from './alerts';

export default combineReducers({ Auth, questions, tags, alerts })