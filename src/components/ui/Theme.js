import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const arcGrey = "#868686";

export default createTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
    },
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
  },
  typography: {
    tab: {
      fontSize: "1rem",
      fontWeight: 700,
      fontFamily: "Raleway",
      textTransform: "none",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white",
    },
    learnButton: {
      borderColor: arcBlue,
      color: arcBlue,
      borderRadius: 50,
      borderWidth: 2,
      textTransform: "none",
      fontFamily: "Roboto",
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "Raleway",
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.5,
      color: arcBlue,
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      fontWeight: 700,
      color: arcBlue,
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: arcGrey,
    },
  },
});
