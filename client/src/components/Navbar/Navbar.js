import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link as LinkR, useHistory, useLocation } from 'react-router-dom';
import { TimelineLite, Power3 } from 'gsap';
// import { gsap } from 'gsap/gsap-core';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/ActionTypse';
import decode from 'jwt-decode';
import { AiOutlineSearch } from 'react-icons/ai';
import { success } from '../../actions/alerts';
import stackoverflowLogo from '../../images/stackoverflowLogo.png';


export default function Navbar({ isOpen, setIsOpen, isSignup, setIsSignup, search, setSearch, searchQuestions }) {
    let Line1 = useRef(null);
    let Line2 = useRef(null);
    let Line3 = useRef(null);

    // gsap.registerPlugin(TimelineLite);
    var t1 = new TimelineLite();
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (isOpen) {
            t1.to(Line1, 0.2, { rotation: "-=45deg", y: "8px", ease: Power3.easeOut })
                .to(Line2, 0, { opacity: "0", ease: Power3.easeOut })
                .to(Line3, 0.2, { rotation: "+=45deg", y: "-8px", ease: Power3.easeOut })
        } else {
            t1.to(Line1, 0.1, { rotation: "0deg", y: "0px", ease: Power3.easeOut })
                .to(Line2, 0.1, { opacity: "1", ease: Power3.easeOut })
                .to(Line3, 0.1, { rotation: "0deg", y: "0px", ease: Power3.easeOut })
        }
    }, [isOpen]);


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const userlogout = () => {
        dispatch({ type: LOGOUT });
        dispatch(success("Successfully logged out."));
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) userlogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchQuestions();
            setSearch("");
        }
    }


    return (
        <div className="Nav">
            <div className="NavbarContainer">
                <LinkR onClick={toggle} className="MobileIcon">
                    <div ref={el => Line1 = el} className="Line1"></div>
                    <div ref={el => Line2 = el} className="Line1"></div>
                    <div ref={el => Line3 = el} className="Line1"></div>
                </LinkR>
                <LinkR to='/' className="NavLogo"
                    onClick={() => setIsOpen(false)}
                >
                    IITG
                    <img className="logoImage" height="40px" src={stackoverflowLogo} alt="StackOverCloned" />
                </LinkR>

                <div class="Bar input-group mb-3">
                    <span class="searchIcon input-group-text" id="basic-addon1"><AiOutlineSearch /></span>
                    <input type="text" onKeyDown={handleKeyPress} value={search} onChange={(e) => setSearch(e.target.value)} class="searchBar form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                </div>
                <div className="NavMenu">

                    {user ?
                        <>
                            <div className="NavItem">
                                <LinkR className="NavLinks" to='user'>{user.result.name}</LinkR>
                            </div>
                            <div className="NavItem">
                                <LinkR onClick={userlogout} className="NavLinks"
                                >Log Out</LinkR>
                            </div>
                        </>

                        :
                        <>
                            <div className="NavItem">
                                <LinkR onClick={() => setIsSignup(true)} className="NavLinks" to='/signin'
                                >Sign in</LinkR>
                            </div>
                            <div className="NavItem">
                                <LinkR onClick={() => setIsSignup(false)} className="NavLinks" to='/signup'
                                >Sign up</LinkR>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
