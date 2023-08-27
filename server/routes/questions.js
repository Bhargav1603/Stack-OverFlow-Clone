import express from 'express';
import auth from '../middlewares/auth.js';

const router = express.Router();
import { createQuestion, updateQuestion, deleteQuestion, getQuestions, getQuestion, getQuestionsBySearch, getQuestionsByTag } from '../controllers/questions.js'

router.get('/', getQuestions);
router.get('/search', getQuestionsBySearch);
router.post('/', auth, createQuestion);
router.get('/:id', getQuestion);
router.get('/tag/:tag', getQuestionsByTag);
router.delete('/:id', deleteQuestion);
router.patch('/:id', auth, updateQuestion);


export default router;