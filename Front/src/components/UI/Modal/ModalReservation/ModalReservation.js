import React, { useState, useEffect } from "react";
import Backdrop from "../../BackDrop/BackDrop";
import classes from "./ModalReservation.css";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import Spinner from "../../Spinner/Spinner";
import * as actions from "../../../../store/Actions/Index";

const modalReservation = (props) => {

  const [reservation, setReservation] = useState({
    startDate: "",
    endDate: "",
  });
  const [date, onChangeDate] = useState();
  const [message, setMessage] = useState('');


  useEffect(() => {
    props.onReservationsDates(props.idHouse);
  }, []);

  useEffect(() => {
    setMessage('');
  }, [props.show]);
  
  useEffect(() => {
    if (props.error !== null) {
      setMessage(props.error)  ;
    } else if (props.succes !== null) {
      setMessage(props.succes);
    }  
    
  }, [props.error,props.succes]);



  const submitHandler =  (event) => {
    event.preventDefault();
     props.onReservation(
      reservation.startDate,
      reservation.endDate,
      props.idHouse
    );
    
  };


  let containDate = (date) => {
    if (props.reservationsDates !== null) {
      return (
        props.reservationsDates.filter((d) => Date.parse(d) == Date.parse(date))
          .length > 0
      );
    }
  };

  let spin = null;
  if(props.loading){
    spin = <Spinner/>
  }else{
    spin=<button className={classes.button36} type="submit">Submit</button>
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <form
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        onSubmit={submitHandler}
      >
        <div
          className="custom-calendar-container"
          style={{ display: "flex", margin: "10px 10px" ,justifyContent:"space-around"}}
        >
        <div>
          <span>Start Date</span>
          <Calendar
            onChange={(event) =>
              setReservation({
                ...reservation,
                startDate: new Date(event).toISOString().split("T")[0],
              })
            }
            value={date}
            tileDisabled={({ date }) =>
              containDate(new Date(date).toLocaleDateString())
            }
          />
          </div>
          <div>
          <span>End Date</span>
          <Calendar
            onChange={(event) =>
              setReservation({
                ...reservation,
                endDate: new Date(event).toISOString().split("T")[0],
              })
            }
            value={date}
            tileDisabled={({ date }) =>
              containDate(new Date(date).toLocaleDateString())
            }
          />
          </div>
        </div>

        {spin}
        <p style={{
          color: props.error ? "red" : "green",
        }}>{message}</p>
      </form>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.reservation.error,
    succes: state.reservation.succes,
    reservationsDates: state.reservation.houseReservationsDates,
    loading: state.reservation.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReservation: (startDate, endDate, idHouse) =>
      dispatch(actions.reservation(startDate, endDate, idHouse)),
    onReservationsDates: (idHouse) =>
      dispatch(actions.getReservationHouse(idHouse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalReservation);
