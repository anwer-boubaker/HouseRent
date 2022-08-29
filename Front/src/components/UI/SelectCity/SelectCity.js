import React from "react";

import classes from "./SelectCity.css";
const citys = (props) => {
  return (
    <select onChange={props.changed} defaultValue={props.val} required="required">
      <option value="0">Select city</option>
      <option value="Ariana">Ariana Governorate</option>
      <option value="Ben Arous">Ben Arous Governorate</option>
      <option value="Bizerte">Bizerte Governorate</option>
      <option value="Gabes">Gabès Governorate</option>
      <option value="Gafsa">Gafsa Governorate</option>
      <option value="Jendouba">Jendouba Governorate</option>
      <option value="Kairouan">Kairouan Governorate</option>
      <option value="Kasserine">Kasserine Governorate</option>
      <option value="Kassrine">Kassrine</option>
      <option value="Kebili">Kebili Governorate</option>
      <option value="Kef">Kef Governorate</option>
      <option value="Mahdia">Mahdia Governorate</option>
      <option value="Manouba">Manouba Governorate</option>
      <option value="Medenine">Medenine Governorate</option>
      <option value="Monastir">Monastir Governorate</option>
      <option value="Sfax">Sfax Governorate</option>
      <option value="Sidi">Sidi Bouzid Governorate</option>
      <option value="Siliana">Siliana Governorate</option>
      <option value="Sousse">Sousse Governorate</option>
      <option value="Tataouine">Tataouine Governorate</option>
      <option value="Tozeur">Tozeur Governorate</option>
      <option value="Tunis">Tunis Governorate</option>
      <option value="Zaghouan">Zaghouan Governorate</option>
    </select>
  );
};

export default citys;
