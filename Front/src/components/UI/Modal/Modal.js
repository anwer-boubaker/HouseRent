import React, { useEffect, useState } from "react";
import Backdrop from "../BackDrop/BackDrop";
import classes from "./Modal.css";
import SelectCity from "../SelectCity/SelectCity";
import { updateObject } from "../../../store/Utility";
import { connect } from "react-redux";

import * as actions from "../../../store/Actions/Index";

const modal = (props) => {
  let [house, setHouse] = useState({
    title:'',
    discreption:'',
    location:'',
    price_day:'',
    price_week:'',
    price_month:'',
    summer_price : {
      price_day:'',
      price_week:'',
      price_month:'',
    }
  });
  useEffect(()=>{
    if(props.house !== null && props.updated ){
      setHouse(props.house);
    }
  },[])
  const [images, setImages] = useState(null);

  const inputChangedHandler = (event, value) => {
    console.log(event);
    switch (value) {
      case (value = "title"):
        return setHouse({ ...house, [value]: event });
      case (value = "discreption"):
        return setHouse({ ...house, [value]: event });
      case (value = "location"):
        return setHouse({ ...house, [value]: event });
      case (value = "price_day"):
        return setHouse({ ...house, [value]: event });
      case (value = "price_week"):
        return setHouse({ ...house, [value]: event });
      case (value = "price_month"):
        return setHouse({ ...house, [value]: event });
      case (value = "price_sum_day"):
        return setHouse({
          ...house,
          summer_price: updateObject(house.summer_price, { price_day: event }),
        });
      case (value = "price_sum_week"):
        return setHouse({
          ...house,
          summer_price: updateObject(house.summer_price, { price_week: event }),
        });
      case (value = "price_sum_month"):
        return setHouse({
          ...house,
          summer_price: updateObject(house.summer_price, {
            price_month: event,
          }),
        });

        case (value = "image"):
          let images = [];

          for (let i = 0; i < event.target.files.length; i++) {
           images.push(event.target.files[i]);
            
          }
        return setImages(images);

      default:
        return null;
    }
  };
  
   const submitHandler = (event) => {
    event.preventDefault();
    if(props.updating){
      if(images !== null){
        props.onUpdateHouse(props.house.id_house,house,images);
        
      }else {
        props.onUpdateHouse(props.house.id_house,house,null);
       
      }
      
    }else{
      props.onAddHouse(house,images);
    }
  };

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
        <label>House title</label>
        <input
        required="required"
          type="text"
          name="title"
          defaultValue={props.updating?props.house.title:house.title}
          onChange={(event) => inputChangedHandler(event.target.value, "title")}
        />
        <label>House Discreption</label>
        <textarea
        required="required"
        defaultValue={props.updating?props.house.discreption:house.discreption}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "discreption")
          }
        ></textarea>
        <label>House Location</label>
        <SelectCity
        required="required"
          val={props.updating?props.house.location:house.location}
          changed={(event) =>
            inputChangedHandler(event.target.value, "location")
          }
        />
        <label>House Price Day</label>
        <input
        required="required"
          type="number"
          name="price_day"
          defaultValue={props.updating?props.house.price_day:house.price_day}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_day")
          }
        />
        <label>House Price Week</label>
        <input
        required="required"
          type="number"
          name="price_week"
          defaultValue={props.updating?props.house.price_week:house.price_week}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_week")
          }
        />
        <label>House Price Month</label>
        <input
        required="required"
          type="number"
          name="price_month"
          defaultValue={props.updating?props.house.price_month:house.price_month}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_month")
          }
        />
        <label>House Price summer Day</label>
        <input
        required="required"
          type="number"
          name="price_sum_day"
          defaultValue={props.updating?props.house.summer_price.price_day:house.summer_price.price_day}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_sum_day")
          }
        />
        <label>House Price summer Week</label>
        <input
        required="required"
          type="number"
          name="price_sum_week"
          defaultValue={props.updating?props.house.summer_price.price_week:house.summer_price.price_week}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_sum_week")
          }
        />
        <label>House Price summer Month</label>
        <input
        required="required"
          type="number"
          name="price_sum_month"
          defaultValue={props.updating?props.house.summer_price.price_month:house.summer_price.price_month}
          onChange={(event) =>
            inputChangedHandler(event.target.value, "price_sum_month")
          }
        />
        <label>Your House Images</label>
        <input
        required={props.updating?null:"required"}
          type="file"
          multiple
          onChange={(event) => inputChangedHandler(event, "image")}
        />
        <button type="submit" >Submit</button>
      </form>
    </React.Fragment>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    myHouses: () => dispatch(actions.getMyHouses()),
    onUpdateHouse: (idHouse,house,image) => dispatch(actions.updateMyHouse(idHouse,house,image)),
    onAddHouse: (house,image) => dispatch(actions.addMyHouse(house,image)),
  };
};

export default connect(null,mapDispatchToProps)(modal);
