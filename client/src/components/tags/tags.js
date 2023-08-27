import React, { useState } from 'react';
import './tags.css';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Tagbtn from './tagbtn';
import { AiOutlineSearch } from 'react-icons/ai';
import handleSorting from '../../services/handleSorting';
import { CircularProgress } from '@material-ui/core';


const Tags = () => {
    const { tags, isLoading } = useSelector((state) => state.tags);
    const [fetchSearch, setFetchSearch] = useState('');
    const [sortType, setSortType] = useState('Popular');

    const handleChange = (e) => {
        e.preventDefault();
        setFetchSearch(e.target.value);
        console.log(fetchSearch);
    };
    const update = true;

    return (
        <div className="tagsContainer">
            <div className="tagsNav">
                <div className="tagsHeader">Tags</div>
                <div className="tagsBody">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</div>
                <div>{tags.length} tags</div>
                <div className="tagsBar">
                    <div class="filterBar input-group mb-3">
                        <span class="searchIcon input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
                        <input type="text"
                            class="searchBar form-control"
                            aria-label="Search"
                            aria-describedby="basic-addon1"
                            value={fetchSearch}
                            placeholder='filter by tag name'
                            onChange={handleChange}
                        />
                    </div>
                    <div class="tagsSortbtns btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" onClick={() => setSortType('Popular')} class="popular btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
                        <label class="btn btn-outline-success fw-bold" for="btnradio1">Popular</label>

                        <input type="radio" onClick={() => setSortType('Name')} class="Name btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                        <label class="btn btn-outline-success fw-bold" for="btnradio2">Name</label>

                        <input type="radio" onClick={() => setSortType('Newest')} class="newest btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
                        <label class="btn btn-outline-success fw-bold" for="btnradio3">Newest</label>
                    </div>
                </div>
            </div>
            {isLoading ? <div className="loading"><CircularProgress /></div> : (
                <div className="tagsContent">
                    {tags.filter((tag) =>
                        tag.skill.toLowerCase().includes(fetchSearch.toLowerCase())
                    )?.sort(handleSorting(sortType)).map((tag) => (
                        <div key={tag._id} class="card tagCard">
                            <div class="card-body">
                                <div className="card-title">
                                    <Tagbtn name={tag.skill} update={update} />
                                </div>
                                <p class="tagbody card-text">{tag.body}</p>
                                <div className="tagFooter">
                                    <div>{tag.questions_count} questions</div>
                                    <div>Added {moment(tag.created).fromNow()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tags;
