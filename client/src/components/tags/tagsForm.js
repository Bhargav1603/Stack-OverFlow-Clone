import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './tagsForm.css';
import { newTag } from '../../actions/tags';

const TagsForm = () => {
    const [tagData, settagData] = useState({ skill: "", body: "" });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        settagData({ ...tagData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(newTag(tagData))
        clear();
    };
    const clear = () => {
        settagData({ skill: "", body: "" });
    }
    return (
        <form className="tagsForm" onSubmit={handleSubmit}>
            <div class="mb-3">
                <label class="form-label" for="skill">skill : </label>
                <input class="form-control" value={tagData.skill} type="text" onChange={handleChange} id="skill" name="skill" required />
            </div>
            <div class="mb-3">
                <label class="form-label" for="body">body : </label>
                <input class="form-control" value={tagData.body} type="text" onChange={handleChange} id="body" name="body" required />
            </div>
            <button class="btn btn-success" type="Submit" >Post</button>
        </form>
    );
}

export default TagsForm;
