import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Menu from "./core/menu";
const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/profile/:userId" component={Profile} />
      </Switch>
    </div>
  );
};
export default MainRouter;
