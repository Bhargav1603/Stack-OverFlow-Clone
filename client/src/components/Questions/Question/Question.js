import React from 'react';
import './Question.css';
import moment from 'moment';
import { useHistory } from 'react-router';
import Tagbtn from '../../tags/tagbtn';

export default function Question({ question }) {
    const history = useHistory();

    const openQuestion = () => {
        history.push(`/question/${question._id}`);
    }

    return (
        <div className="QuestionContainer">
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
            <div className="QuestionInfo">
                <a onClick={openQuestion} className="QuestionTitle">
                    {question.title}
                </a>
                <div className="QuestionTags">
                    {question.tags.map((tag) => (
                        <Tagbtn name={tag} />
                    ))}
                </div>
                <div className="QuestionFooter">
                    <div className="time">
                        Asked {moment(question.created).fromNow()}
                    </div>
                    <a className="creator">
                        {question.creator.name}
                    </a>
                </div>
            </div>
        </div>
    )
}
