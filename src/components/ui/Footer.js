import { Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import facebook from "../../assets/facebook.svg";
import footerAdornment from "../../assets/footerAdornment.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import { menuRoutesOptions, routesOptions, servicesIndex } from "../../config";
import * as routes from "../../Routes";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative",
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em",
    },
  },
  mainContainer: {
    position: "absolute",
  },
  gridItem: {
    margin: "3em",
  },
  link: {
    color: "white",
    fontFamily: "Arial",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textDecoration: "none",
  },
  icon: {
    height: "4em",
    width: "4em",
    [theme.breakpoints.down("xs")]: {
      height: "2.5em",
      width: "2.5em",
    },
  },
  socialMediaContainer: {
    position: "absolute",
    marginTop: "-6em",
    right: "1.5em",
    [theme.breakpoints.down("xs")]: {
      marginTop: "-4em",
      right: "0.6em",
    },
  },
}));

export default function Footer(props) {
  const { setRouteIndex, setMenuRouteIndex } = props;
  const classes = useStyles();

  const handleLinkClick = (route) => {
    const routeOption = routesOptions[route];
    const menuRouteOption = menuRoutesOptions[route];

    if (menuRouteOption) {
      setRouteIndex(servicesIndex);
      setMenuRouteIndex(menuRouteOption.activeIndex);
    } else if (routeOption) {
      setRouteIndex(routeOption.activeIndex);
    }
  };

  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid
          container
          justifyContent="center"
          className={classes.mainContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.HOME}
                onClick={() => {
                  handleLinkClick(routes.HOME);
                }}
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.SERVICES}
                onClick={() => {
                  handleLinkClick(routes.SERVICES);
                }}
              >
                Services
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.CUSTOM_SOFTWARE}
                onClick={() => {
                  handleLinkClick(routes.CUSTOM_SOFTWARE);
                }}
              >
                Custom Software Development
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.MOBILE_APPS}
                onClick={() => {
                  handleLinkClick(routes.MOBILE_APPS);
                }}
              >
                iOS/Android App Development
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.WEBSITES}
                onClick={() => {
                  handleLinkClick(routes.WEBSITES);
                }}
              >
                Website Development
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.REVOLUTION}
                onClick={() => {
                  handleLinkClick(routes.REVOLUTION);
                }}
              >
                The Revolution
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.REVOLUTION}
                onClick={() => {
                  handleLinkClick(routes.REVOLUTION);
                }}
              >
                Vision
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.REVOLUTION}
                onClick={() => {
                  handleLinkClick(routes.REVOLUTION);
                }}
              >
                Technology
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.REVOLUTION}
                onClick={() => {
                  handleLinkClick(routes.REVOLUTION);
                }}
              >
                Process
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.ABOUT}
                onClick={() => {
                  handleLinkClick(routes.ABOUT);
                }}
              >
                About Us
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.ABOUT}
                onClick={() => {
                  handleLinkClick(routes.ABOUT);
                }}
              >
                History
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.ABOUT}
                onClick={() => {
                  handleLinkClick(routes.ABOUT);
                }}
              >
                Team
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid container direction="column" spacing={2}>
              <Grid
                item
                className={classes.link}
                component={Link}
                to={routes.CONTACT}
                onClick={() => {
                  handleLinkClick(routes.CONTACT);
                }}
              >
                Contact Us
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <img
        alt="black decorative slash"
        src={footerAdornment}
        className={classes.adornment}
      />

      <Grid
        container
        className={classes.socialMediaContainer}
        justifyContent="flex-end"
        spacing={2}
      >
        <Grid
          item
          component="a"
          href="https://www.facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="facebook logo" src={facebook} className={classes.icon} />
        </Grid>
        <Grid
          item
          component="a"
          href="https://www.twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="twitter logo" src={twitter} className={classes.icon} />
        </Grid>
        <Grid
          item
          component="a"
          href="https://www.instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="instagram logo" src={instagram} className={classes.icon} />
        </Grid>
      </Grid>
    </footer>
  );
}
