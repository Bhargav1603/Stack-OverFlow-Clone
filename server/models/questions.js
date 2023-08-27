import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Comment from './comments.js';
import Answer from './answers.js';

const QuestionSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

QuestionSchema.post('findOneAndDelete', async (doc) => {
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
        await Answer.deleteMany({
            _id: {
                $in: doc.answers
            }
        })
    }
})


export default mongoose.model('Question', QuestionSchema);