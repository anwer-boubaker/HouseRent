import React from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import classes from "./HouseFilter.css";
import SelectCity from "../../UI/SelectCity/SelectCity";

const houseFilter = (props) => {
  const data = {
      location: "",
      startDate: "",
      endDate: "",
    }
  

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
    props.onSersh(
      data.location,
      data.startDate,
      data.endDate
    );
  };

  const inputChangedHandler = (event, value) => {
    
    data[value] = event;
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.HouseFilter}>
        <label>Select Your Destination</label>
        <SelectCity
          className={classes.input}
          value={data.location}
          changed={(event) => inputChangedHandler(event.target.value, "location")}
        />
        <label>Start Date</label>
        <input
        required="required"
          type="date"
          name="startDate"
          className={classes.input}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "startDate")
          }
        />
        <label>End Date</label>
        <input
        required="required"
          type="date"
          name="endDate"
          className={classes.input}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "endDate")
          }
        />
        <button className={classes.button36} type="submit">Serch</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSersh: (location, startDate, endDate) =>
      dispatch(actions.filterHouses(location, startDate, endDate)),
  };
};

export default connect(null, mapDispatchToProps)(houseFilter);
