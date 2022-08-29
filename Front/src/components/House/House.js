import React, { useState, useEffect } from "react";
import ModalReservation from "../UI/Modal/ModalReservation/ModalReservation";
import { withRouter } from "react-router-dom";
import HouseReservations from "./LessorHouses/HouseReservations/HouseReservations";
import Modal from "../UI/Modal/Modal";

import classes from "./House.css";

const house = (props) => {
  let houses = null;

  const current = new Date().getMonth() + 1;

  const [prices, setPrices] = useState({
    price_day: "",
    price_week: "",
    price_month: "",
  });
  useEffect(() => {
    if(props.house !== null){
      if (current === 6||current === 7||current === 8) {
        setPrices({
          price_day: props.house.price_day,
          price_week: props.house.price_week,
          price_month: props.house.price_month,
        });
      } else {
        setPrices({
          price_day: props.house.summer_price.price_day,
          price_week: props.house.summer_price.price_week,
          price_month: props.house.summer_price.price_month,
        });
      }
    }
    
  }, []);

  

  const [updating, setUpdate] = useState(false);

  const [showRes, setShowRes] = useState(false);

  const [reserving, setReserving] = useState(false);

  const addReservation = () => {
    if (localStorage.getItem("token") == null) {
      props.history.push("/login");
    } else setReserving(true);
  };

  const CancelHandler = () => {
    setReserving(false);
    setUpdate(false);
  };

  const updatHouse = () => {
    setUpdate(true);
  };

  const reservationHandler = () => {
    setShowRes(!showRes);
  };

  if (props.house !== null && props.oneHouse === true) {
    houses = (
      <div className={classes.House}>
        <ModalReservation
          show={reserving}
          modalClosed={CancelHandler}
          idHouse={props.idHouse}
        ></ModalReservation>

        {props.children}
        <div className={classes.Container}>
          <div className={classes.info}>
          <h3 style={{    color: "#1e588c"
        }}><strong>Title : </strong>{props.house.title}</h3>
            <p><strong>Location : </strong>{props.house.location}</p>
            <p><strong>Discreption : </strong>{props.house.discreption}</p>
            <p><strong>Price / Day : </strong>{prices.price_day} DT</p>
            <p><strong>Price / Week : </strong>{prices.price_week} DT</p>
            <p><strong>Price / Month : </strong>{prices.price_month} DT</p>
          </div>
          <div className={classes.info}>
            <h3 style={{    color: "#1e588c"
          }}><strong>Owner Info</strong></h3>
            <p><strong>Name : </strong>{props.house.user.name}</p>
            <p><strong>Last Name : </strong>{props.house.user.last_name}</p>
            <p><strong>Email: </strong>{props.house.user.email}</p>
            <p><strong>Phone Number: </strong>{props.house.user.phone_number}</p>
          </div>
        </div>
        <button className={classes.button36} onClick={addReservation}>Reservation</button>
      </div>
    );
  } else if (props.house !== null && props.oneHouse === false) {
    let modal = (
      <Modal
        house={props.house}
        show={updating}
        modalClosed={CancelHandler}
        updating={true}
      ></Modal>
    );
    let reservations = null;
    if (props.lessor && showRes) {
      reservations = props.house.reservation.map((res) => {
        return (
          <HouseReservations
            key={res.id_reservation}
            reservations={res}
            idHouse={props.house.id_house}
          />
        );
      });
    }

    houses = (
      <div className={classes.House}>
        {modal}
        <div className={classes.Container}>
          <div>
            <img
              src={"http://127.0.0.1:8000" + props.house.images[0].path}
              alt="images"
            />
          </div>
          <div className={classes.info}>
            <h3 style={{    color: "#1e588c"
            }}><strong>Title : </strong>{props.house.title}</h3>
            <label><strong>Location : </strong>{props.house.location}</label>
            <p><strong>Discreption : </strong>{props.house.discreption}</p>
            <p><strong>Price / Day / Week / Month : </strong>{prices.price_day} DT / {prices.price_week} DT / {prices.price_month} DT</p>
          </div>
        </div>
        <div className={classes.Buttons}>
          {props.lessor ? <button className={classes.button36} onClick={updatHouse}>Update</button> : null}

          {props.children}
        </div>
        <div>
          {props.lessor ? (
            <button className={classes.button36} onClick={reservationHandler}>show reservations</button>
          ) : null}
          {reservations}
        </div>
      </div>
    );
  }

  return <div>{houses}</div>;
};

export default withRouter(house);
