import React, { Component } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import classes from "./Auth.css";
import * as actions from "../../store/Actions/Index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    user: {
      email: "lessor@gmail.com",
      password: "Assassincreed2",
    },
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.user.email, this.state.user.password);
  };

  inputChangedHandler = (event, value) => {
    const updatedControls = {
      ...this.state.user,
      [value]: event,
    };

    this.setState({ user: updatedControls });
  };

  render() {
    let spin = null;
    if (this.props.loading) {
      spin = <Spinner />;
    } else {
      spin = (
        <form onSubmit={this.submitHandler}>
          <label>Your email</label>
          <input
            type="email"
            name="email"
            placeholder="your email"
            value={this.state.user.email}
            onChange={(event) =>
              this.inputChangedHandler(event.target.value, "email")
            }
          />
          <label>Your password</label>
          <input
            type="password"
            name="password"
            placeholder="your password"
            value={this.state.user.password}
            onChange={(event) =>
              this.inputChangedHandler(event.target.value, "password")
            }
          />

          <button className={classes.log} type="submit">Login</button>
        </form>
      );
    }
    let error = null;
    if (this.props.error !== null) {
      error = <p className={classes.error}>login faild please try again</p>;
    }
    return (
      <div className={classes.Auth}>
        {spin}

        {error}
        <NavLink to="/register">
          <p>create an account ?</p>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
