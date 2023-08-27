import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    body: String,
    created: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVoted: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downVoted: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

export default mongoose.model('Answer', AnswerSchema);