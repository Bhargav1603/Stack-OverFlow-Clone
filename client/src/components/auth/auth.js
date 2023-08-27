import React, { useState } from 'react';
import './auth.css';
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, signin } from '../../actions/auth';
import { CircularProgress } from '@material-ui/core';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = ({ isSignup, setIsSignup }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { isLoading } = useSelector((state) => state.Auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signin(formData, history));
        } else {
            dispatch(signup(formData, history));
        }
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    return (
        <div className="auth">
            <div class="card authCard col-md-4 offset-md-4 mt-5">
                <div class="card-body">
                    <h3 class="card-title text-center mt-3 mb-4">{!isSignup ? "Sign up" : "Sign in"}</h3>
                    <h6 class="card-subtitle">
                        <form onSubmit={handleSubmit}  >
                            {!isSignup && <div class="name">
                                <div class=" firstName mb-3">
                                    <label class="form-label" for="firstName">firstName : </label>
                                    <input class="form-control" onChange={handleChange} type="text" id="firstName" name="firstName" required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div class=" lastName mb-3">
                                    <label class="form-label" for="lastName">lastName : </label>
                                    <input class="form-control" onChange={handleChange} type="text" id="lastName" name="lastName" required />
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                            </div>
                            }
                            <div class="mb-3">
                                <label class="form-label" for="email">email : </label>
                                <input class="form-control" onChange={handleChange} type="email" id="email" name="email" required />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="password">Password : </label>
                                <div className="adornment">
                                    <input type={showPassword ? "text" : "password"} onChange={handleChange} name="password" class="form-control" id="password" />
                                    <button class="btn btn-outline-primary" type="button" onClick={() => setShowPassword(!showPassword)} id="button-addon2">{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</button>
                                </div>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            {!isSignup && <div class="mb-3">
                                <label class="form-label" for="confirmPassword">confirmPassword : </label>
                                <input class="form-control" onChange={handleChange} type="password" id="comnfirmPassword" name="confirmPassword" required />
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            }
                            <div class="mb-3">
                                <button class="btn btn-success btn-fullWidth" type="submit">
                                    {isLoading ? <div><CircularProgress fontSize="small" /></div> : (
                                        <div>
                                            {!isSignup ? "Sign up" : "Sign in"}
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>
                    </h6>
                </div>
            </div>
            {
                isSignup ?
                    <div className="info">Dont' have an account? <span className="span" onClick={() => {
                        setShowPassword(false);
                        setIsSignup(false);
                    }}>SignUp</span></div> : <div className="info">Already have an account? <span className="span" onClick={() => {
                        setShowPassword(false);
                        setIsSignup(true);
                    }}>SignIn</span></div>
            }
        </div >

    );
}

export default Auth;
