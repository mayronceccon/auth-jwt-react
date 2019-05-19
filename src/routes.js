import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from './lib/Auth';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isAuth = isAuthenticated();
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path={["/login", "/"]} exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/clientes" exact component={Clientes} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
