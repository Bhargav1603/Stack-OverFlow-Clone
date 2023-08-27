import express from 'express';
import auth from '../middlewares/auth.js';
const router = express.Router({ mergeParams: true });
import { createComment, deleteComment } from '../controllers/comments.js';


router.post('/', auth, createComment);
router.delete('/:cmnt_id', deleteComment)

export default router;