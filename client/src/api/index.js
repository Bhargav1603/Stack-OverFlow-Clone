import axios from 'axios';
import qs from 'qs';

const API = axios.create({ baseURL: "https://stack-over-cloned.herokuapp.com/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const askQuestion = (questionData) => API.post('/question', questionData);
export const fetchQuestions = (page) => API.get(`/question?page=${page}`);
export const fetchQuestionsBySearch = (searchQuery) => API.get(`/question/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const fetchQuestionsByTag = (tag) => API.get(`/question/tag/${tag}`, qs.stringify(tag));
export const fetchQuestion = (id) => API.get(`/question/${id}`);
export const newComment = (commentData, id) => API.post(`/question/${id}/comment`, commentData);
export const newAnswer = (answerData, id) => API.post(`/question/${id}/answer`, answerData);
export const deleteQuestion = (id) => API.delete(`/question/${id}`);
export const deleteAnswer = (answer_id, id) => API.delete(`/question/${id}/answer/${answer_id}`);
export const deleteComment = (comment_id, id) => API.delete(`/question/${id}/comment/${comment_id}`);
export const updateQuestion = (id, updatedQuestion) => API.patch(`/question/${id}`, updatedQuestion);
export const upVote = (id, answer_id) => API.patch(`/question/${id}/answer/${answer_id}/upvote`);
export const downVote = (id, answer_id) => API.patch(`/question/${id}/answer/${answer_id}/downvote`);
export const newTag = (tagData) => API.post('/tag', tagData);
export const fetchtags = () => API.get('/tag');
export const fetchTag = (tag) => API.get(`/tag/${tag}`);
export const updateTag = (tag) => API.patch(`/tag`, tag);