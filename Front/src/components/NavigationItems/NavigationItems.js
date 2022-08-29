import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { AiFillHome } from "react-icons/ai";
import { TbLogin, TbLogout } from "react-icons/tb";

const navigationItems = (props) => {
  const logout = () => {
    localStorage.clear("token");
  };

  let loged = null;
  if (localStorage.getItem("token") === null) {
    loged = (
      <NavigationItem link="/login">
        <TbLogin style={{ height: "20px", width: "25px" }} />
        <p style={{ margin: "0" }}>Login</p>
      </NavigationItem>
    );
  } else {
    loged = (
      <NavigationItem link="/login">
        <TbLogout style={{ height: "20px", width: "25px" }} />
        <p style={{ margin: "0" }} onClick={logout}>
          Log Out
        </p>
      </NavigationItem>
    );
  }

  let muHouses = null;
  if (localStorage.getItem("role") === "lessor") {
    muHouses = (
      <NavigationItem link="/lessorhouses">
        <TbLogin style={{ height: "20px", width: "25px" }} />
        <p style={{ margin: "0" }}>My Houses</p>
      </NavigationItem>
    );
  }
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        <AiFillHome style={{ height: "20px", width: "25px" }} />
        <p style={{ margin: "0" }}>Homes</p>
      </NavigationItem>

      {muHouses}
      {loged}
    </ul>
  );
};

export default navigationItems;
