import express from 'express';
import auth from '../middlewares/auth.js';
const router = express.Router({ mergeParams: true });
import { createAnswer, deleteAnswer, upVote, downVote } from '../controllers/answers.js';


router.post('/', auth, createAnswer);
router.delete('/:ans_id', deleteAnswer);
router.patch('/:ans_id/upvote', auth, upVote);
router.patch('/:ans_id/downvote', auth, downVote);

export default router;