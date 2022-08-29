import React, { useEffect } from "react";

import * as actions from "../../../store/Actions/Index";
import House from "../House";
import Spinner from "../../UI/Spinner/Spinner";
import Carousel from "../../UI/Carousel/Carousel";
import { connect } from "react-redux";

const oneHouse = (props) => {
  const idHouse = props.location.pathname.split('/').pop();
  useEffect(() => {
    props.oneHouse(props.location.pathname);
  }, []);

  let spin = null;
  if (props.loading) {
    spin = <Spinner />;
  } else {
    if (!Array.isArray(props.houses)) {
      const house = props.houses;

      spin = (
        <div>
          <House house={house} oneHouse={true} idHouse={idHouse}>
            <Carousel house={props.houses} />
          </House>
        </div>
      );
    }
  }
  return <div>{spin}</div>;
};

const mapStateToProps = (state) => {
  return {
    houses: state.Houses.houses,
    loading: state.Houses.loading,
    error: state.Houses.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oneHouse: (id) => dispatch(actions.oneHouse(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(oneHouse);
