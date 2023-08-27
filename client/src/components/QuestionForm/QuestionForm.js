import React, { useState, useEffect } from 'react';
import './QuestionForm.css';
import image1 from '../../images/Question.png'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { askQuestion } from '../../actions/questions';
import { getQuestion, updateQuestion } from '../../actions/questions';
import ChipInput from 'material-ui-chip-input';
import { alerterror } from '../../actions/alerts';


export default function QuestionForm({ currentQuestionId, setCurrentQuestionId }) {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [tags, setTags] = useState([]);
    const [questionData, setQuestionData] = useState({ title: "", body: "", tags: [] });
    const dispatch = useDispatch();
    const history = useHistory();
    const question = useSelector((state) => state.questions.question);


    const handleChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentQuestionId) {
            setCurrentQuestionId(null);
            dispatch(updateQuestion(currentQuestionId, questionData))
            history.push(`/question/${currentQuestionId}`);
        } else {
            if (user) {
                dispatch(askQuestion(questionData));
            } else {
                dispatch(alerterror("Please Login to Post a Question"));
            }
        }
        clear();
    };

    useEffect(() => {
        setQuestionData({ ...questionData, tags: tags });
    }, [tags])

    useEffect(() => {
        if (currentQuestionId) {
            dispatch(getQuestion(currentQuestionId));
            console.log(question);
            setTags(question.tags);
            setQuestionData({ ...questionData, title: question.title, body: question.body, tags: tags });
        }
    }, [setCurrentQuestionId])


    const clear = () => {
        setQuestionData({ title: "", body: "", tags: [] });
        setTags([]);
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }


    return (
        <div className="Question">
            <div className="QuestionNav">
                <div className="QuestionHeader">
                    Ask a public question
                </div>
                <div className="image">
                    <img src={image1} alt="" />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="card questionCard">
                    <div className="card-body">
                        <div class="title mb-3">
                            <label class="form-label" for="title">Title</label>
                            <p> Be specific and imagine you’re asking a question to another person</p>
                            <input class="form-control" value={questionData.title} onChange={handleChange} type="text" id="title" name="title" required />
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div class="body mb-3">
                            <label class="form-label" for="body">Body</label>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea class="form-control" value={questionData.body} onChange={handleChange} rows="6" type="text" id="body" name="body" required />
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div class="tags mb-3">
                            <label class="form-label" for="tags">Tags</label>
                            <p> Add up to 5 tags to describe what your question is about</p>
                            <ChipInput
                                class="form-control"
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                id="tags"
                            />
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-success questionBtn" type="Submit" >{currentQuestionId ? "Update Your Question" : "Post Your Question"}</button>
            </form>
        </div>
    )
}
