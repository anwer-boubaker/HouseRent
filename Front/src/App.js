import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/layout/Layaout";
import Auth from "./containers/Auth/Auth";
import Register from "./containers/Register/Register";
import HousesList from "./containers/HousesList/HousesList";
import OneHouse from "./components/House/OneHouse/OneHouse";
import LessorHouses from "./components/House/LessorHouses/LessorHouses";
import HouseReservations from "./components/House/LessorHouses/HouseReservations/HouseReservations";
import classes from "./App.css";


class App extends Component {


  render() {

    return (
      <div className={classes.App}>
        <Layout>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Register} />
            <Route path="/onehouse/" component={OneHouse} />
            <Route path="/lessorhouses/reservations/" component={HouseReservations} />
            <Route path="/lessorhouses" component={LessorHouses} />
            <Route path="/" component={HousesList} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
