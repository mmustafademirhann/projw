import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Success from "./components/Success";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/success" component={Success} />
    </Switch>
  </Router>
);
