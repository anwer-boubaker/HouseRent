import axios from "axios";

import * as actionTypes from "./ActionTypes";

export const reservationStart = () => {
  return {
    type: actionTypes.RESERVATION_HOUSES_START
  };
};

export const reservationSuccess = () => {
  return {
    type: actionTypes.RESERVATION_HOUSES_SUCCESS,
  };
};

export const reservationFail = (error) => {
  return {
    type: actionTypes.RESERVATION_HOUSES_FAIL,
    error: error,
  };
};

export const getReservationStart = () => {
  return {
    type: actionTypes.GET_RESERVATION_HOUSES_START
  };
};

export const getReservationSuccess = (houseReservations) => {
  return {
    type: actionTypes.GET_RESERVATION_HOUSES_SUCCESS,
    houseReservations : houseReservations
  };
};

export const getReservationFail = (error) => {
  return {
    type: actionTypes.GET_RESERVATION_HOUSES_FAIL,
    error: error,
  };
};

export const reservationHandlerSuccess = () => {
  return {
    type: actionTypes.RESERVATION_HOUSES_HANDLER,
    
  };
};

export const getReservationHouseSuccess = (houseReservationsDates) => {
  return {
    type: actionTypes.GET_RESERVATION_HOUSE,
    houseReservationsDates:houseReservationsDates
  };
};

export const reservation =  (startDate,endDate,id_house) => {
  return (dispatch) => {
    dispatch(reservationStart());
    const token = localStorage.getItem("token");
    const data = {
      start_date: startDate,
      end_date: endDate
    };
     axios
      .post("http://127.0.0.1:8000/api/reservation/"+ id_house, data,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        dispatch(
            reservationSuccess(response.data.access_token, response.data.user)
        );
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(reservationFail(err.response.data.message));
      });
  };
};

export const getReservation = (id_house) => {
  return (dispatch) => {
    dispatch(getReservationStart());
    const token = localStorage.getItem("token");
  
    axios
      .get("http://127.0.0.1:8000/api/lessor/reservations/"+ id_house,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(
            getReservationSuccess(response.data)
        );
      })
      .catch((err) => {
        dispatch(getReservationFail(err.response.data.massage));
      });
  };
};

export const reservationHandler = (value,idRes) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const data = {confirmation:value}
    axios
      .post("http://127.0.0.1:8000/api/lessor/handelReservation/"+idRes, data,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(
          reservationHandlerSuccess()
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getReservationHouse = (idHouse) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/getreservation/"+idHouse,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(
          getReservationHouseSuccess(response.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
