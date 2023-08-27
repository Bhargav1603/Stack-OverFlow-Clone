import Comment from '../models/comments.js';
import Question from '../models/questions.js';
import mongoose from 'mongoose';


export const createComment = async (req, res) => {
    const comment = req.body;
    const { id } = req.params;
    try {
        const newComment = new Comment(comment);
        newComment.creator = req.userId;
        const question = await Question.findById(id);
        question.comments.push(newComment);
        await newComment.save();
        await question.save();
        const updatedquestion = await Question.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'creator'
            }
        }).populate({
            path: 'answers',
            populate: {
                path: 'creator'
            }
        }).populate('creator');
        res.status(201).json(updatedquestion);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteComment = async (req, res) => {
    const { id, cmnt_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cmnt_id)) return res.status(404).send('No post with that id');
    try {
        const question = await Question.findByIdAndUpdate(id, { $pull: { comments: cmnt_id } });
        await Comment.findByIdAndDelete(cmnt_id);
        const updatedquestion = await Question.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'creator'
            }
        }).populate({
            path: 'answers',
            populate: {
                path: 'creator'
            }
        }).populate('creator');
        res.status(201).json(updatedquestion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}