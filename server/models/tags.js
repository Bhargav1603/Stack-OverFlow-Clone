import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    skill: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    },
    questions_count: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Tag', TagsSchema);