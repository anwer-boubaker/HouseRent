import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/Actions/Index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import House from "../../components/House/House";
import HouseFilter from "../../components/House/HouseFilter/HouseFilter";
import classes from "./HousesList.css";

class HousesList extends Component {



  componentDidMount() {
    this.props.allHouses();
  }

  

  render() {

    let spin = null;
    if (this.props.loading) {
      spin = <Spinner />;
    } else {
      if (Array.isArray(this.props.houses)) {
        spin = this.props.houses.map((house) => {
          return (
            <NavLink key={house.id_house} to={"/onehouse/"+house.id_house}>
              <House  house={house} oneHouse={false} lessor={false}/>
            </NavLink>
          );
        });
      } else {
        spin = <p>{this.props.error}</p>;
      }
    }

    return (
      <div>
        <HouseFilter />
        {spin}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.Houses.houses,
    loading: state.Houses.loading,
    error: state.Houses.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allHouses: () => dispatch(actions.allHouses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HousesList);
