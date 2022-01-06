import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import * as routes from "../../Routes";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: { ...theme.mixins.toolbar, marginBottom: "3em" },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "8em",
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
}));

const tabValues = {
  [routes.HOME]: 0,
  [routes.SERVICES]: 1,
  [routes.REVOLUTION]: 2,
  [routes.ABOUT]: 3,
  [routes.CONTACT]: 4,
};

export default function Header() {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(tabValues[routes.HOME]);

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const tabIndex = tabValues[window.location.pathname];
    tabIndex !== undefined && setTabValue(tabIndex);
  }, []);

  const handleClickLogo = () => {
    setTabValue(tabValues[routes.HOME]);
  };

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              disableRipple
              className={classes.logoContainer}
              onClick={handleClickLogo}
              component={Link}
              to={routes.HOME}
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            <Tabs
              className={classes.tabsContainer}
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={Link}
                to={routes.HOME}
              />
              <Tab
                className={classes.tab}
                label="Services"
                component={Link}
                to={routes.SERVICES}
              />
              <Tab
                className={classes.tab}
                label="The Revolution"
                component={Link}
                to={routes.REVOLUTION}
              />
              <Tab
                className={classes.tab}
                label="About Us"
                component={Link}
                to={routes.ABOUT}
              />
              <Tab
                className={classes.tab}
                label="Contact Us"
                component={Link}
                to={routes.CONTACT}
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
