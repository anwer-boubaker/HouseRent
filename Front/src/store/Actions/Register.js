import axios from "axios";

import * as actionTypes from "./ActionTypes";

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerSuccess = (token, user) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    token: token,
    user: user,
  };
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};

export const register = (user) => {
  return (dispatch) => {
    dispatch(registerStart());
    const authData = {
      name: user.name,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      phone_number: user.phone,
      city: user.city,
      prefered_place: user.preferedPlace,
      user_type: user.userType,
    };
    axios
      .post("http://127.0.0.1:8000/api/register", authData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem('role',authData.user_type);
        dispatch(
          registerSuccess(response.data.access_token, response.data.user)
        );
        window.location = '/';
      })
      .catch((err) => {
        dispatch(registerFail(err.response.data.massage));
      });
  };
};
