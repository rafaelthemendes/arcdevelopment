import { ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { homeIndex, servicesMenuIndex } from "../config";
import * as routes from "../Routes";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import theme from "./ui/Theme";

function App() {
  const [routeIndex, setRouteIndex] = useState(homeIndex);
  const [menuRouteIndex, setMenuRouteIndex] = useState(servicesMenuIndex);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          routeIndex={routeIndex}
          setRouteIndex={setRouteIndex}
          menuRouteIndex={menuRouteIndex}
          setMenuRouteIndex={setMenuRouteIndex}
        />
        <Switch>
          <Route exact path={routes.HOME} component={() => <div>Home</div>} />
          <Route
            exact
            path={routes.SERVICES}
            component={() => <div>Services</div>}
          />
          <Route
            exact
            path={routes.CUSTOM_SOFTWARE}
            component={() => <div>Custom Software</div>}
          />
          <Route
            exact
            path={routes.MOBILE_APPS}
            component={() => <div>Mobile Apps</div>}
          />
          <Route
            exact
            path={routes.WEBSITES}
            component={() => <div>Websites</div>}
          />
          <Route
            exact
            path={routes.REVOLUTION}
            component={() => <div>Revolution</div>}
          />
          <Route
            exact
            path={routes.ABOUT}
            component={() => <div>About Us</div>}
          />
          <Route
            exact
            path={routes.CONTACT}
            component={() => <div>Contact Us</div>}
          />
          <Route
            exact
            path={routes.ESTIMATE}
            component={() => <div>Estimate</div>}
          />
        </Switch>
        <Footer
          setRouteIndex={setRouteIndex}
          setMenuRouteIndex={setMenuRouteIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
