import axios from 'axios';

import { Redirect } from 'react-router';
import * as actionTypes from './ActionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    console.log(Redirect);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };
        
        axios.post('http://127.0.0.1:8000/api/login', authData)
            .then(response => {
                localStorage.setItem('token',response.data.access_token);
                localStorage.setItem('role',response.data.user.user_type);
                dispatch(authSuccess(response.data.access_token, response.data.user));
                window.location = '/';
            })
            .catch(err => {
                console.log(err);   
                dispatch(authFail(err));
            });
    };
};