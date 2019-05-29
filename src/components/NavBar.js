import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinks from "./LoggedInLinks";
import {
  checkAuth,
  getAuthUser,
  logoutUser
} from "../store/actions/authActions";
import { SET_AUTH } from "../store/types";
import store from "../store/store";
import jwt from "jwt-decode";
import axios from "axios";
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
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwt(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getAuthUser());
  }
}
class NavBar extends Component {
  render() {
    const { classes, user } = this.props;
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
          {user.auth ? <LoggedInLinks /> : <LoggedOutLinks />}
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {
  checkAuth,
  getAuthUser,
  logoutUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
