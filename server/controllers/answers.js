import Answer from '../models/answers.js';
import Question from '../models/questions.js';
import mongoose from 'mongoose';


export const createAnswer = async (req, res) => {
    const answer = req.body;
    const { id } = req.params;
    try {
        const newanswer = new Answer(answer);
        newanswer.creator = req.userId;
        const question = await Question.findById(id);
        question.answers.push(newanswer);
        await newanswer.save();
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

export const deleteAnswer = async (req, res) => {
    const { id, ans_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ans_id)) return res.status(404).send('No post with that id');
    try {
        const question = await Question.findByIdAndUpdate(id, { $pull: { answers: ans_id } });
        await Answer.findByIdAndDelete(ans_id);
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

export const upVote = async (req, res) => {
    const { ans_id, id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ans_id)) return res.status(404).send('No post with that id');
    try {
        const answer = await Answer.findById(ans_id);
        answer.downVoted = answer.downVoted.filter((u_id) => String(u_id) !== req.userId);
        const index = answer.upVoted.findIndex((u_id) => String(u_id) === req.userId);

        if (index === -1) {
            answer.upVoted.push(req.userId);
        } else {
            answer.upVoted = answer.upVoted.filter((u_id) => String(u_id) !== req.userId);
        }
        await Answer.findByIdAndUpdate(ans_id, answer, { new: true });
        const question = await Question.findById(id).populate({
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
        res.json(question);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const downVote = async (req, res) => {
    const { ans_id, id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(ans_id)) return res.status(404).send('No post with that id');
    try {
        const answer = await Answer.findById(ans_id);
        answer.upVoted = answer.upVoted.filter((u_id) => String(u_id) !== req.userId);
        const index = answer.downVoted.findIndex((u_id) => String(u_id) === req.userId);

        if (index === -1) {
            answer.downVoted.push(req.userId);
        } else {
            answer.downVoted = answer.downVoted.filter((u_id) => String(u_id) !== req.userId);
        }
        await Answer.findByIdAndUpdate(ans_id, answer, { new: true });
        const question = await Question.findById(id).populate({
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
        res.json(question);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}