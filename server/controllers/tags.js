import mongoose from 'mongoose';
import Tag from '../models/tags.js';
import Question from '../models/questions.js';

export const create = async (req, res) => {
    const tag = req.body;
    const newtag = new Tag({ ...tag, creator: req.userId });
    try {
        await newtag.save();
        res.status(201).json(newtag);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const gettags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getTag = async (req, res) => {
    const { tag: skill } = req.params;
    try {
        const tag = await Tag.find({ skill: { $in: [skill] } });
        res.status(200).json(tag);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateTag = async (req, res) => {
    const tag = req.body;
    try {
        const total = await Question.countDocuments({ tags: { $in: tag.name } });
        const updatedTag = await Tag.findOneAndUpdate({ skill: tag.name }, { $set: { questions_count: total } }, { upsert: true })
        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
