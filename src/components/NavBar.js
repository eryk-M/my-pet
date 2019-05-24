import React from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
//logo
import Logo from "../assets/images/pet-logo-small.png";
//MUI
import AppBar from "@material-ui/core/AppBar/AppBar";
import ToolBar from "@material-ui/core/Toolbar/Toolbar";
import Button from "@material-ui/core/Button/Button";
const styles = theme => ({
  ...theme,
  logo: {
    height: 80,
    width: 80
    // position: "absolute",
    // left: -80
  }
});
const NavBar = props => {
  const { classes } = props;
  return (
    <AppBar>
      <ToolBar className={classes.toolbar}>
        <img src={Logo} alt="MyPetLogo" className={classes.logo} />
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/"
        >
          Strona główna
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/login"
        >
          Zaloguj się
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/register"
        >
          Zarejestruj się
        </Button>
      </ToolBar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
