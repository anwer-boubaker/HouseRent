import React, { Component } from "react";

import SelectCity from "../../components/UI/SelectCity/SelectCity"

import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Register.css";
class Register extends Component {
  state = {
    user: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      preferedPlace: "",
      userType: "user",
    },
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onRegister(this.state.user);
  };

  inputChangedHandler = (event, value) => {
    const updatedControls = {
      ...this.state.user,
      [value]: event,
    };

    this.setState({ user: updatedControls });
  };

  errorsHandler = (val) => {
    if(this.props.error !== null){
        switch (val){
            case val='name': return <p className={classes.error}>{this.props.error.name}</p>
            case val='lastName': return <p className={classes.error}>{this.props.error.last_name}</p>
            case val='email': return <p className={classes.error}>{this.props.error.email}</p>
            case val='phone': return <p className={classes.error}>{this.props.error.phone_number}</p>
            case val='city': return <p className={classes.error}>{this.props.error.city}</p>
            case val='preferedPlace': return <p className={classes.error}>{this.props.error.prefered_place}</p>
            case val='password': return <p className={classes.error}>{this.props.error.password}</p>
            default:return null;
        }
    }
    

  }

  render() {
    console.log(this.props.error);
    let spin = null;
    if (this.props.loading) {
      spin = <Spinner />;
    } else{
       spin = <form onSubmit={this.submitHandler}>
        <label>Your Are ?</label>
        <select name="type" onChange={(event) =>
          this.inputChangedHandler(event.target.value, "userType")
        }>
          <option value="user" defaultValue>
            user
          </option>
          <option value="lessor">Lessor</option>
        </select>
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="your name"
          value={this.state.user.name}
          onChange={(event) =>
            this.inputChangedHandler(event.target.value, "name")
          }
        />
        {this.errorsHandler('name')}

        <label>Your Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="your last name"
          value={this.state.user.lastName}
          onChange={(event) =>
            this.inputChangedHandler(event.target.value, "lastName")
          }
        />
        {this.errorsHandler('lastName')}
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
        {this.errorsHandler('email')}
        <label>Your Phone Number</label>
        <input
          type="number"
          name="phone"
          placeholder="your phone"
          value={this.state.user.phone}
          onChange={(event) =>
            this.inputChangedHandler(event.target.value, "phone")
          }
        />
        {this.errorsHandler('phone')}
        <label>Your City</label>
        <SelectCity changed={(event) =>
          this.inputChangedHandler(event.target.value, "city")
        }/>
        {this.errorsHandler('city')}

        <label>Your Prefered Place</label>
        <SelectCity changed={(event) =>
          this.inputChangedHandler(event.target.value, "preferedPlace")
        }/>
        {this.errorsHandler('preferedPlace')}

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
        {this.errorsHandler('password')}

        <button className={classes.log} type="submit">Register</button>
      </form>
    }
    
    return (
      <div className={classes.Register}>
        {spin}
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.register.user,
      loading: state.register.loading,
      error: state.register.error,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onRegister: (user) => dispatch(actions.register(user)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Register);
