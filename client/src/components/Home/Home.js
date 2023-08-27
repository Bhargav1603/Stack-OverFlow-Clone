import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Auth from '../auth/auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import Questions from '../Questions/Questions';
import Sidebar from '../Sidebar/Sidebar';
import Tags from '../tags/tags';
import TagsForm from '../tags/tagsForm';
import Pagination from '../pagination/pagination';
import QuestionForm from '../QuestionForm/QuestionForm';
import './Home.css';
import QuestionDetails from '../QuestionDetails/QuestionDetails'
import { gettags } from '../../actions/tags';
import { useHistory, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Notification from '../../Notifications/Notification';
import { success } from '../../actions/alerts'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Home({ isSignup, setIsSignup, setIsOpen, search, setSearch, searchQuestions }) {
    const dispatch = useDispatch();
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const alert = useSelector(state => state.alerts);

    useEffect(() => {
        dispatch(gettags());
    }, [dispatch]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchQuestions();
            setSearch("");
        }
    }

    return (
        <div>
            {alert.message && <div className="notification-wrapper">
                <Notification  {...alert} />
            </div>}

            <Switch>
                <Route exact path="/" component={() => <Redirect to='/questions' />} />
                <Route exact path="/newQuestion" >
                    <QuestionForm setCurrentQuestionId={setCurrentQuestionId} currentQuestionId={currentQuestionId} />
                </Route>
                <Route exact path="/signup">

                    <Auth isSignup={isSignup} setIsSignup={setIsSignup} />

                </Route>
                <Route exact path="/signin" >
                    <Auth isSignup={isSignup} setIsSignup={setIsSignup} />
                </Route>
                <Route exact path="/questions">
                    <div class="HomeSearchBar input-group mb-3">
                        <span class="searchIcon input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
                        <input type="text" onKeyDown={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)} class="searchBar form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                    </div>
                    <div className="AppContainer">
                        <div className="sidebar">
                            <Sidebar setIsOpen={setIsOpen} />
                        </div>
                        <div className="homeContent">
                            <Questions searchQuery={searchQuery} tags={false} />
                            <div className="pagination">
                                {(!searchQuery) &&
                                    (<Pagination page={page} />)}
                            </div>
                        </div>
                    </div>
                </Route>
                <Route exact path="/questions/tags/:tag">
                    <div class="HomeSearchBar input-group mb-3">
                        <span class="searchIcon input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
                        <input type="text" onKeyDown={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)} class="searchBar form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                    </div>
                    <div className="AppContainer">
                        <div className="sidebar">
                            <Sidebar setIsOpen={setIsOpen} />
                        </div>
                        <div className="homeContent">
                            <Questions searchQuery={searchQuery} tags={true} />
                        </div>
                    </div>
                </Route>

                <Route exact path="/question/:id">
                    <div className="AppContainer">
                        <div className="sidebar">
                            <Sidebar setIsOpen={setIsOpen} />
                        </div>
                        <div className="homeContent">
                            <QuestionDetails setCurrentQuestionId={setCurrentQuestionId} />
                        </div>
                    </div>
                </Route>
                {/* <Route exact path="/newtag">
                    <TagsForm />
                </Route> */}
                <Route exact path="/tags">
                    <div className="AppContainer">
                        <div className="sidebar">
                            <Sidebar setIsOpen={setIsOpen} />
                        </div>
                        <div className="homeContent">
                            <Tags />
                        </div>
                    </div>
                </Route>
            </Switch>
        </div>


    )
}
