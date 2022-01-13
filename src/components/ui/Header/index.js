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
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import * as routes from "../../../Routes";
import ElevationScroll from "./ElevationScroll";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const routesOptions = {
  [routes.HOME]: { name: "Home", link: routes.HOME, activeIndex: 0 },
  [routes.SERVICES]: {
    name: "Services",
    link: routes.SERVICES,
    activeIndex: 1,
  },
  [routes.REVOLUTION]: {
    name: "The Revolution",
    link: routes.REVOLUTION,
    activeIndex: 2,
  },
  [routes.ABOUT]: { name: "About Us", link: routes.ABOUT, activeIndex: 3 },
  [routes.CONTACT]: {
    name: "Contact Us",
    link: routes.CONTACT,
    activeIndex: 4,
  },
  [routes.ESTIMATE]: {
    name: "Free Estimate",
    link: routes.ESTIMATE,
    activeIndex: 5,
  },
};

const menuRoutesOptions = {
  [routes.SERVICES]: {
    name: "Services",
    link: routes.SERVICES,
    activeIndex: 0,
  },
  [routes.CUSTOM_SOFTWARE]: {
    name: "Custom Software Development",
    link: routes.CUSTOM_SOFTWARE,
    activeIndex: 1,
  },
  [routes.MOBILE_APPS]: {
    name: "App Development",
    link: routes.MOBILE_APPS,
    activeIndex: 2,
  },
  [routes.WEBSITES]: {
    name: "Website Development",
    link: routes.WEBSITES,
    activeIndex: 3,
  },
};

const homeIndex = routesOptions[routes.HOME].activeIndex;
const servicesIndex = routesOptions[routes.SERVICES].activeIndex;
const servicesMenuIndex = menuRoutesOptions[routes.SERVICES].activeIndex;

const routesOptionsValues = Object.values(routesOptions);
const menuRoutesOptionsValues = Object.values(menuRoutesOptions);

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
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const [routeIndex, setRouteIndex] = useState(homeIndex);
  const [menuRouteIndex, setMenuRouteIndex] = useState(servicesMenuIndex);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const servicesSelected = routeIndex === servicesIndex;

  useEffect(() => {
    const routeOption = routesOptions[window.location.pathname];
    const menuRouteOption = menuRoutesOptions[window.location.pathname];

    if (menuRouteOption) {
      setRouteIndex(servicesIndex);
      setMenuRouteIndex(menuRouteOption.activeIndex);
    } else if (routeOption) {
      setRouteIndex(routeOption.activeIndex);
    }
  }, []);

  const handleTabChange = (_, newValue) => {
    setRouteIndex(newValue);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuItemClick = (index) => {
    handleMenuClose();
    setRouteIndex(servicesIndex);
    setMenuRouteIndex(index);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuOpen(false);
  };

  const handleDrawerItemClick = (index) => {
    setDrawerOpen(false);
    setRouteIndex(index);
  };

  const handleClickLogo = () => {
    setRouteIndex(homeIndex);
  };

  const renderTab = (routeOption) => {
    const servicesTabExtraProps = {
      ...(routeOption.link === routes.SERVICES && {
        onMouseOver: handleMenuClick,
        "aria-owns": menuAnchor ? "services-menu" : undefined,
        "aria-haspopup": menuAnchor ? "true" : undefined,
      }),
    };
    return (
      <Tab
        key={routeOption.name}
        className={classes.tab}
        label={routeOption.name}
        component={Link}
        to={routeOption.link}
        {...servicesTabExtraProps}
      />
    );
  };

  const renderListItem = (routeOption) => {
    const selected = routeOption.activeIndex === routeIndex;
    const estimateRouteExtraProps = {
      ...(routeOption.link === routes.ESTIMATE && {
        className: classes.drawerItemEstimate,
      }),
    };
    return (
      <ListItem
        key={routeOption.name}
        divider
        button
        component={Link}
        to={routeOption.link}
        selected={selected}
        onClick={() => handleDrawerItemClick(routeOption.activeIndex)}
        {...estimateRouteExtraProps}
      >
        <ListItemText
          disableTypography
          className={classNames(classes.drawerItem, {
            [classes.drawerItemSelected]: selected,
          })}
        >
          {routeOption.name}
        </ListItemText>
      </ListItem>
    );
  };

  const renderMenuItem = (menuRouteOption) => {
    const selected =
      servicesSelected && menuRouteOption.activeIndex === menuRouteIndex;
    return (
      <MenuItem
        key={menuRouteOption.name}
        onClick={() => handleMenuItemClick(menuRouteOption.activeIndex)}
        component={Link}
        to={menuRouteOption.link}
        selected={selected}
        classes={{
          root: classes.menuItem,
        }}
      >
        {menuRouteOption.name}
      </MenuItem>
    );
  };

  const tabs = (
    <>
      <Tabs
        className={classes.tabsContainer}
        value={routeIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
      >
        {routesOptionsValues.map(renderTab)}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to={routes.ESTIMATE}
      >
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
        keepMounted
      >
        {menuRoutesOptionsValues.map(renderMenuItem)}
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
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>{routesOptionsValues.map(renderListItem)}</List>
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
