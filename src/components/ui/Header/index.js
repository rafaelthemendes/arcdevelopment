import {
  AppBar,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import * as routes from "../../../Routes";
import ElevationScroll from "./ElevationScroll";
import MenuIcon from "@material-ui/icons/Menu";

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const tabValues = {
  [routes.HOME]: 0,
  [routes.SERVICES]: 1,
  [routes.REVOLUTION]: 2,
  [routes.ABOUT]: 3,
  [routes.CONTACT]: 4,
};

const menuItemValues = {
  [routes.SERVICES]: 0,
  [routes.CUSTOM_SOFTWARE]: 1,
  [routes.MOBILE_APPS]: 2,
  [routes.WEBSITES]: 3,
};

const menuOptions = [
  { name: "Services", link: routes.SERVICES },
  {
    name: "Custom Software Development",
    link: routes.CUSTOM_SOFTWARE,
  },
  { name: "App Development", link: routes.MOBILE_APPS },
  { name: "Website Development", link: routes.WEBSITES },
];

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
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
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const [tabValue, setTabValue] = useState(tabValues[routes.HOME]);
  const [menuItemValue, setMenuItemValue] = useState(
    menuItemValues[routes.SERVICES]
  );

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const servicesSelected = tabValue === tabValues[routes.SERVICES];

  useEffect(() => {
    const tabIndex = tabValues[window.location.pathname];
    const menuItemIndex = menuItemValues[window.location.pathname];

    if (menuItemIndex !== undefined) {
      setTabValue(tabValues[routes.SERVICES]);
      setMenuItemValue(menuItemIndex);
    } else if (tabIndex !== undefined) {
      setTabValue(tabIndex);
    }
  }, []);

  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuItemClick = (index) => {
    handleMenuClose();
    setTabValue(tabValues[routes.SERVICES]);
    setMenuItemValue(index);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuOpen(false);
  };

  const handleClickLogo = () => {
    setTabValue(tabValues[routes.HOME]);
  };

  const tabs = (
    <>
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
          aria-owns={menuAnchor ? "services-menu" : undefined}
          aria-haspopup={menuAnchor ? "true" : undefined}
          className={classes.tab}
          label="Services"
          component={Link}
          to={routes.SERVICES}
          onMouseOver={handleMenuClick}
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
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="services-menu"
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ onMouseLeave: handleMenuClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
      >
        {menuOptions.map((menuOption, index) => (
          <MenuItem
            key={menuOption.name}
            onClick={() => handleMenuItemClick(index)}
            component={Link}
            to={menuOption.link}
            classes={{
              root: classes.menuItem,
            }}
            selected={servicesSelected && index === menuItemValue}
          >
            {menuOption.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      >
        Drawer
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

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
            {screenDownMd ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
