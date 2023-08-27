import express from 'express';
import { create, gettags, getTag, updateTag } from '../controllers/tags.js';

const router = express.Router();

router.post('/', create);
router.get('/', gettags);
router.get('/:tag', getTag);
router.patch('/', updateTag);

export default router;