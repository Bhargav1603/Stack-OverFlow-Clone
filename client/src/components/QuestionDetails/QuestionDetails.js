import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './QuestionDetails.css';
import { getQuestion, newComment, newAnswer, deleteQuestion, deleteAnswer, deleteComment, upVote, downVote } from '../../actions/questions';
import moment from 'moment';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Tagbtn from '../tags/tagbtn';
import { alerterror } from '../../actions/alerts';
import { CircularProgress } from '@material-ui/core';



export default function QuestionDetails({ setCurrentQuestionId }) {
    const { question, isLoading } = useSelector((state) => state.questions);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const [commentData, setCommentData] = useState({ body: "" });
    const [answerData, setAnswerData] = useState({ body: "" });
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getQuestion(id));
    }, [id]);
    if (!question) return null;

    const commentChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    };

    const commentSubmit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(newComment(commentData, id));
        } else {
            dispatch(alerterror("Please Login to post a Comment"));
        }
        setCommentData({ body: "" })
    };

    const answerChange = (e) => {
        setAnswerData({ ...answerData, [e.target.name]: e.target.value });
    };

    const answerSubmit = (e) => {
        e.preventDefault();
        if (user) {
            dispatch(newAnswer(answerData, id));
        } else {
            dispatch(alerterror("Please Login to Answer a Question"));
        }
        setAnswerData({ body: "" })
    };

    const update = () => {
        setCurrentQuestionId(id);
        history.push('/newQuestion');
    }

    return (
        isLoading ? <div className="loading">< CircularProgress /></div > : (
            <div className="qDetailsContainer" >
                <div className="qDetailsNav">
                    <div className="qDetailsHeader">
                        {question.title}
                    </div>
                </div>
                <div className="qDetailsBar">
                    Asked {moment(question.created).fromNow()}
                </div>
                <div className="qDetailsContent">
                    <div className="votes">
                        <div className="commentsNo">
                            <div className="No">{question.comments.length}</div>
                            <div className="label">Comments</div>
                        </div>
                        <div className="answersNo">
                            <div className="No">{question.answers.length}</div>
                            <div className="label">Answers</div>
                        </div>
                        <div className="tagsNo">
                            <div className="No">{question.tags.length}</div>
                            <div className="label">Tags</div>
                        </div>
                    </div>
                    <div className="qDetailsInfo">
                        <div className="qDetailsBody">
                            {question.body}
                        </div>
                        <div className="qDetailsTags">
                            {question.tags.map((tag) => (
                                <Tagbtn name={tag} />
                            ))}
                        </div>
                        <div className="qDetailsFooter">
                            {(user?.result?._id === question.creator._id) && <a className="qUpdate" onClick={update}>update</a>}
                            {(user?.result?._id === question.creator._id) && <a className="qDelete" onClick={() => dispatch(deleteQuestion(id, history))}>delete</a>}

                            <a className="qcreator">
                                {question.creator.name}
                            </a>
                        </div>
                        {question.comments && question.comments.map((comment) => (
                            <div className="commentInfo">
                                <div className="CommentBody">{comment.body} - <a className="commentCreator">{comment.creator.name}</a> - {moment(comment.created).fromNow()}</div>
                                {(user?.result?._id === comment.creator._id) && <a onClick={() => dispatch(deleteComment(comment._id, id))} class="commentDelete">delete</a>}
                            </div>
                        ))}
                        <form className="commentForm" onSubmit={commentSubmit}>
                            <input class="qcomment form-control" placeholder="Leave a comment" value={commentData.body} onChange={commentChange} name="body" type="text" required />
                            <button class="commentbtn btn btn-success">post</button>
                        </form>
                    </div>
                </div>
                <div className="answerForm">
                    <div className="AnswerHeader">Answers</div>
                    {question.answers && question.answers.map((answer) => (
                        <div className="AnswerInfo">
                            <div className="AnswerVotes">
                                <div className="upVote" onClick={() => {
                                    if (user) {
                                        dispatch(upVote(id, answer._id))
                                    } else {
                                        dispatch(alerterror("Please Login to Vote a Answer"));
                                    }
                                }}>{answer.upVoted.find((id) => id === user?.result?._id) ? <IoMdArrowDropup className="arrowFilled" /> : <BiUpArrow />}</div>
                                <div className="voteNo">{answer.upVoted.length - answer.downVoted.length} </div>
                                <div className="downVote" onClick={() => {
                                    if (user) {
                                        dispatch(downVote(id, answer._id))
                                    } else {
                                        dispatch(alerterror("Please Login to Vote a Answer"));
                                    }
                                }}>{answer.downVoted.find((id) => id === user?.result?._id) ? <IoMdArrowDropdown className="arrowFilled" /> : <BiDownArrow />}</div>
                            </div>
                            <div className="AnswerContent">
                                <div className="AnswerBody">{answer.body}</div>
                                <div className="AnswerFooter">
                                    <div className="AnswerCreated">Answered {moment(answer.created).fromNow()}</div>
                                    <a className="AnswerCreator">{answer.creator.name}</a>
                                </div>

                            </div>
                            {(user?.result?._id === answer.creator._id) && <a onClick={() => dispatch(deleteAnswer(answer._id, id))} className="answerDelete">delete</a>}
                        </div>
                    ))}
                </div>
                <form className="answerForm" onSubmit={answerSubmit}>
                    <div>Your Answer</div>
                    <textarea class="qAnswer form-control" rows="6" placeholder="Enter a body with minimum 30 characters" value={answerData.body} onChange={answerChange} name="body" type="text" required />
                    <button class="btn btn-success">Post Your Answer</button>
                </form>
            </div>
        )


    )
}
