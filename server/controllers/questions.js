import mongoose from 'mongoose';
import Question from '../models/questions.js';


export const getQuestion = async (req, res) => {
    const { id } = req.params;
    try {
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
        res.status(200).json(question);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getQuestions = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Question.countDocuments({});
        const questions = await Question.find().populate('creator').limit(LIMIT).skip(startIndex);;
        res.status(200).json({ data: questions, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), total: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getQuestionsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const search = new RegExp(searchQuery, 'i');
        const questions = await Question.find({ $or: [{ title: { $in: search } }, { body: { $in: search } }] }).populate('creator');
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getQuestionsByTag = async (req, res) => {
    const { tag } = req.params;
    console.log(tag);
    try {
        // const search = new RegExp(searchQuery, 'i');
        const questions = await Question.find({ tags: { $in: [tag] } }).populate('creator');
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createQuestion = async (req, res) => {
    const question = req.body;
    const newQuestion = new Question({ ...question, creator: req.userId });
    try {
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


export const updateQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const question = req.body;
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(_id, { ...question, creator: req.userId }, { new: true });
        res.json(updatedQuestion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    try {
        await Question.findByIdAndDelete(_id);
        res.json("Question Deleted");
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
