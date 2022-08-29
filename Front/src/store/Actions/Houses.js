import axios from "axios";

import * as actionTypes from "./ActionTypes";

export const fetchHousesStart = () => {
  return {
    type: actionTypes.FETCH_HOUSES_START,
  };
};

export const fetchHousesSuccess = (houses) => {
  return {
    type: actionTypes.FETCH_HOUSES_SUCCESS,
    houses: houses,
  };
};

export const fetchHousesFail = (error) => {
  return {
    type: actionTypes.FETCH_HOUSES_FAIL,
    error: error,
  };
};

export const filterHousesStart = () => {
  return {
    type: actionTypes.FILTER_HOUSES_START,
  };
};

export const filterHousesSuccess = (houses) => {
  return {
    type: actionTypes.FILTER_HOUSES_SUCCESS,
    houses: houses,
  };
};

export const filterHousesFail = (error) => {
  return {
    type: actionTypes.FILTER_HOUSES_FAIL,
    error: error,
  };
};

export const getHouseStart = () => {
  return {
    type: actionTypes.GET_HOUSE_START,
  };
};

export const getHouseSuccess = (houses) => {
  return {
    type: actionTypes.GET_HOUSE_SUCCESS,
    houses: houses,
  };
};

export const getHouseFail = (error) => {
  return {
    type: actionTypes.GET_HOUSE_FAIL,
    error: error,
  };
};

export const getMyHousesStart = () => {
  return {
    type: actionTypes.GET_MY_HOUSES_START,
  };
};

export const getMyHousesSuccess = (houses) => {
  return {
    type: actionTypes.GET_MY_HOUSES_SUCCESS,
    houses: houses,
  };
};

export const getMyHousesFail = (error) => {
  return {
    type: actionTypes.GET_MY_HOUSES_FAIL,
    error: error,
  };
};

export const deleteMyHouseStart = (error) => {
  return {
    type: actionTypes.DELETE_MY_HOUSE,
    error: error,
  };
};

export const updateMyHouseStart = (error) => {
  return {
    type: actionTypes.UPDATE_MY_HOUSE,
    error: error,
  };
};

export const addMyHouseStart = (error) => {
  return {
    type: actionTypes.ADD_MY_HOUSE,
    error: error,
  };
};

export const allHouses = () => {
  return (dispatch) => {
    dispatch(fetchHousesStart());
    axios
      .get("http://127.0.0.1:8000/api/showall")
      .then((response) => {
        dispatch(fetchHousesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(fetchHousesFail(err));
      });
  };
};

export const oneHouse = (idHouse) => {
  return (dispatch) => {
    dispatch(getHouseStart());
    axios
      .get("http://127.0.0.1:8000/api" + idHouse)
      .then((response) => {
        dispatch(getHouseSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getHouseFail(err));
      });
  };
};

export const filterHouses = (location, startDate, endDate) => {
  return (dispatch) => {
    dispatch(filterHousesStart());
    const data = {
      location: location,
      start_date: startDate,
      end_date: endDate,
    };
    axios
      .post("http://127.0.0.1:8000/api/filterhouse", data)
      .then((response) => {
        dispatch(filterHousesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(filterHousesFail(err.response.data.message));
      });
  };
};

export const getMyHouses = () => {
  return (dispatch) => {
    dispatch(getMyHousesStart());
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/lessor/myhouse", {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        dispatch(getMyHousesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getMyHousesFail(err.response.data.message));
      });
  };
};

export const deleteMyHouse = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    axios
      .post("http://127.0.0.1:8000/api/lessor/deletehouse/" + id, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(deleteMyHouseStart());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const updateMyHouse = (idHouse,house,images) => {
  
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(images);
    const data = new FormData()
    if(images !== null){
      images.forEach(img => {
      
        data.append('images[]',img)
      });
    }
    
    data.append('title',house.title)
    data.append('discreption',house.discreption)
    data.append('location',house.location)
    data.append('price_day',house.price_day)
    data.append('price_week',house.price_week)
    data.append('price_month',house.price_month)
    data.append('sum_price_day',house.summer_price.price_day)
    data.append('sum_price_week',house.summer_price.price_week)
    data.append('sum_price_month',house.summer_price.price_month)
    
    axios
      .post("http://127.0.0.1:8000/api/lessor/updatehouse/" + idHouse, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(updateMyHouseStart());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const addMyHouse = (house,images) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const data = new FormData()
    images.forEach(img => {
      
      data.append('images[]',img)
    });
    data.append('title',house.title)
    data.append('discreption',house.discreption)
    data.append('location',house.location)
    data.append('price_day',house.price_day)
    data.append('price_week',house.price_week)
    data.append('price_month',house.price_month)
    data.append('sum_price_day',house.summer_price.price_day)
    data.append('sum_price_week',house.summer_price.price_week)
    data.append('sum_price_month',house.summer_price.price_month)
    
    axios
      .post("http://127.0.0.1:8000/api/lessor/addhouse", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(addMyHouseStart());
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
