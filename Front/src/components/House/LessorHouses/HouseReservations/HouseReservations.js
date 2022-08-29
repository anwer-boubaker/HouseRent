import React, { useState,useEffect } from "react";

import { connect } from "react-redux";
import * as actions from "../../../../store/Actions/Index";

const houseReservations = (props) => {
  const  [confirmation,setConfirmation] = useState(null);

  const reservationHandler = (val) => {
    console.log(val);
    switch (val) {
      case val='1' : return props.onReservationsHandler(1, props.reservations.id_reservation);
      case val='0' : return props.onReservationsHandler(0, props.reservations.id_reservation);
      default:return null;
    }
  };

  let reservation = null;
  if (props.reservations !== null) {
    reservation = (
      <tr>
        <th scope="row">
          {props.reservations.user.name} {props.reservations.user.last_name}
        </th>
        <td>{props.reservations.user.email}</td>
        <td>{props.reservations.user.phone_number}</td>
        <td>{props.reservations.start_date}</td>
        <td>{props.reservations.end_date}</td>
        <td>
          <button disabled={props.reservations.confirmation} onClick={ (event) => reservationHandler('1')}>Accept</button>{" "}
          <button disabled={props.reservations.confirmation} onClick={ (event) => reservationHandler('0')}>Reject</button>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Full Name</th>
            <th scope="col">User Email</th>
            <th scope="col">User Phone Number</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{reservation}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    houseReservations: state.reservation.houseReservations,
    loading: state.reservation.loading,
    error: state.reservation.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHouseReservations: (id) => dispatch(actions.getReservation(id)),
    onReservationsHandler: (id, confirmation) =>
      dispatch(actions.reservationHandler(id, confirmation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(houseReservations);
