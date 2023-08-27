import React, { useEffect, useState } from 'react';
import './Questions.css';
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question/Question';
import { getTag } from '../../actions/tags';
import handleSorting from '../../services/handleSorting';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { getQuestionsByTag, getQuestionsBySearch } from '../../actions/questions';

export default function Questions({ searchQuery, tags }) {
    const { questions, isLoading } = useSelector((state) => state.questions);
    const { total } = useSelector((state) => state.questions);
    const dispatch = useDispatch();
    const tag1 = useSelector((state) => state.tags.tag);
    const [sortType, setSortType] = useState('Newest');
    const { tag: skill } = useParams();

    useEffect(() => {
        if (tags) {
            dispatch(getTag(skill));
        }
    }, [skill])
    useEffect(() => {
        if (tags) {
            dispatch(getQuestionsByTag(skill));
        }
        if (searchQuery) {
            dispatch(getQuestionsBySearch({ search: searchQuery }));
        }
    }, [])

    return (
        <div className="QuestionsContainer">
            <div className="QuestionsNav">
                {tags && <div className="QuestionsHeader">
                    Questions tagged [{skill}]
                </div>
                }
                {searchQuery && <div className="QuestionsHeader">
                    Search Results for [{searchQuery}]
                </div>}
                {(!tags && !searchQuery) && (<div className="QuestionsHeader">
                    All Questions
                </div>)}

                <div className="navBtn">
                    <a className="btn btn-success" href="/newQuestion">Ask Question</a>
                </div>
            </div>
            {(tags && tag1) && (tag1.length ? <div className="tagContent">{tag1[0].body}</div> : "")}
            <div className="QuestionBar">

                <div className="totalQuestions">{(tags || searchQuery) ? (questions && questions.length) : total} questions</div>
                <div class="tagsSortbtns btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" onClick={() => setSortType('Newest')} class="newest btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
                    <label class="btn btn-outline-success fw-bold" for="btnradio1">Newest</label>

                    <input type="radio" onClick={() => setSortType('Top')} class="top btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                    <label class="btn btn-outline-success fw-bold" for="btnradio2">Top</label>

                    <input type="radio" onClick={() => setSortType('Oldest')} class="oldest btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                    <label class="btn btn-outline-success fw-bold" for="btnradio3">Oldest</label>
                </div>
            </div>
            {isLoading ? <div className="loading"><CircularProgress /></div> : (
                <div>
                    {questions && questions.sort(handleSorting(sortType)).map((question) => (
                        <div key={question._id} className="QuestionsContent">
                            <Question key={question._id} question={question} />
                        </div>
                    ))
                    }
                </div>
            )}

        </div>
    )
}
