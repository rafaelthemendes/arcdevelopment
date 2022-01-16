import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Lottie from "react-lottie";
import animationData from "../animations/landingAnimation/data";
import customSoftwareIcon from "../assets/customSoftwareIcon.svg";
import ButtonArrow from "./ui/ButtonArrow";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5em",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  buttonContainer: {
    marginTop: "1em",
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 145,
    marginRight: 40,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.9rem",
    height: 45,
    width: 145,
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 8,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "7em",
    },
  },
}));

export default function LandingPage() {
  const classes = useStyles();
  const theme = useTheme();
  const screenDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const heroBlock = (
    <Grid item>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item sm className={classes.heroTextContainer}>
          <Typography variant="h2" align="center">
            Bringing West Coast Technology
            <br />
            to the Midwest
          </Typography>
          <Grid
            container
            className={classes.buttonContainer}
            justifyContent="center"
          >
            <Grid item>
              <Button className={classes.estimateButton} variant="contained">
                Free Estimate
              </Button>
            </Grid>
            <Grid item>
              <Button className={classes.learnButtonHero} variant="outlined">
                <span style={{ marginRight: 10 }}>Learn More</span>
                <ButtonArrow
                  width={15}
                  height={15}
                  fill={theme.palette.common.blue}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm className={classes.animation}>
          <Lottie options={defaultOptions} width="100%" height="100%" />
        </Grid>
      </Grid>
    </Grid>
  );

  const servicesBlock = (
    <Grid item>
      <Grid
        container
        direction="row"
        justifyContent={screenDownSm ? "center" : undefined}
        className={classes.serviceContainer}
      >
        <Grid
          item
          style={{
            marginLeft: screenDownSm ? 0 : "5em",
            textAlign: screenDownSm ? "center" : undefined,
          }}
        >
          <Typography variant="h4">Custom Software Development</Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Save Energy. Save Time. Save Money.
          </Typography>
          <Typography variant="subtitle1">
            Complete digital solutions, from investigation to{" "}
            <span className={classes.specialText}>celebration.</span>
          </Typography>
          <Button variant="outlined" className={classes.learnButton}>
            <span style={{ marginRight: 10 }}>Learn More</span>
            <ButtonArrow
              width={10}
              height={10}
              fill={theme.palette.common.blue}
            />
          </Button>
        </Grid>
        <Grid item>
          <img
            alt="custom software icon"
            src={customSoftwareIcon}
            className={classes.icon}
          />
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container className={classes.root} direction="column">
      {heroBlock}
      {servicesBlock}
    </Grid>
  );
}
