import * as actionTypes from "../Actions/ActionTypes";
import { updateObject } from "../Utility";

const initialState = {
  error: null,
  succes: null,
  houseReservations: null,
  houseReservationsDates: null,
  loading: false,
};

const reservationStart = (state, action) => {
  return updateObject(state, { error: null,loading:true });
};

const reservationSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    succes: "your reservations succeded",
    loading:false,
  });
};

const reservationFail = (state, action) => {
  console.log(action.error);
  return updateObject(state, {
    error: action.error,
    succes: null,
    loading:false
  });
};

const getReservationStart = (state, action) => {
  console.log(action);
  return updateObject(state, { loading: true });
};

const getReservationSuccess = (state, action) => {
  console.log(action);
  return updateObject(state, {
    houseReservations: action.houseReservations,
    loading: false,
  });
};

const getReservationFail = (state, action) => {
  console.log(action.error);
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getReservationHouseSuccess = (state, action) => {
  return updateObject(state, {
    houseReservationsDates: action.houseReservationsDates,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESERVATION_HOUSES_START:
      return reservationStart(state, action);
    case actionTypes.RESERVATION_HOUSES_SUCCESS:
      return reservationSuccess(state, action);
    case actionTypes.RESERVATION_HOUSES_FAIL:
      return reservationFail(state, action);
    case actionTypes.GET_RESERVATION_HOUSES_START:
      return getReservationStart(state, action);
    case actionTypes.GET_RESERVATION_HOUSES_SUCCESS:
      return getReservationSuccess(state, action);
    case actionTypes.GET_RESERVATION_HOUSES_FAIL:
      return getReservationFail(state, action);
    case actionTypes.GET_RESERVATION_HOUSE:
      return getReservationHouseSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
