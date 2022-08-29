import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/Actions/Index";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./LessorHouses.css";
import House from "../House";
import Modal from "../../UI/Modal/Modal";
import { NavLink } from "react-router-dom";

const lessorHouses = (props) => {
  const [adding, setAdd] = useState(false);

  useEffect(() => {
    props.myHouses();
  }, []);

  const deleteHouse = (id) => {
    props.onDeleteHouse(id);
  };

  // const updatingHandler = () => {
  //   setAdd(true);
  // };

  const AddingHandler = () => {
    setAdd(true);
  };

  const CancelHandler = () => {
    setAdd(false);
  };

  let modal = (
    <Modal
      house={null}
      show={adding}
      modalClosed={CancelHandler}
      updating={false}
    ></Modal>
  );
  let spin = null;
  if (props.loading) {
    spin = <Spinner />;
  } else {
    if (Array.isArray(props.houses)) {
      spin = props.houses.map((house) => {
        return (
          <div key={house.id_house}>
            <House house={house} oneHouse={false} lessor={true}>
              <button className={classes.button36} onClick={() => deleteHouse(house.id_house)}>
                Delete
              </button>
            </House>
          </div>
        );
      });
    } else {
      spin = <p>{props.error}</p>;
    }
  }

  return (
    <div>
      {modal}
      <button className={classes.button36} onClick={AddingHandler}>Add house</button>

      {spin}
    </div>
  );
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
    myHouses: () => dispatch(actions.getMyHouses()),
    onDeleteHouse: (id) => dispatch(actions.deleteMyHouse(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(lessorHouses);
