import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {
  homeIndex,
  menuRoutesOptions,
  menuRoutesOptionsValues,
  routesOptions,
  routesOptionsValues,
  servicesIndex,
} from "../../../config";
import * as routes from "../../../Routes";
import ElevationScroll from "./ElevationScroll";

const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

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
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
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
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const { routeIndex, setRouteIndex, menuRouteIndex, setMenuRouteIndex } =
    props;

  const classes = useStyles();
  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

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
  }, [setMenuRouteIndex, setRouteIndex]);

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
        style={{ zIndex: 1302 }}
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
        <div className={classes.toolbarMargin} />
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
        <AppBar position="fixed" className={classes.appBar}>
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
