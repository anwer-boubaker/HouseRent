import React from "react";
import Slider from "react-slick";
import classes from "./Carousel.css";

const carousel = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let images = null;
  if (props.house !== null) {
    images = props.house.images.map((imge) => {
      return <div key={imge.id_image}><img className={classes.image} src={"http://127.0.0.1:8000" + imge.path} alt="images"/></div>;
    });
  }
  return (
    <Slider {...settings}>
      {images}
    </Slider>
  );
};

export default carousel;
