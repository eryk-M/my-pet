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
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
//icon
import Home from "@material-ui/icons/HomeRounded";
import Search from "@material-ui/icons/Search";
import AddCircle from "@material-ui/icons/AddCircleOutline";
const styles = theme => ({
  ...theme,
  logo: {
    height: 80,
    width: 80
  },

  userInterfaceGrid: {
    flexBasis: 0
  },
  notLogged: {
    justifyContent: "center",
    width: 768,
    margin: "0 auto",
    display: "flex"
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
        <ToolBar className={user.auth ? classes.toolbar : classes.notLogged}>
          <Grid item xs={user.auth ? 4 : 2}>
            <img src={Logo} alt="MyPetLogo" className={classes.logo} />
          </Grid>
          <Grid item xs={user.auth ? 6 : 2}>
            <Tooltip title="Strona główna">
              <IconButton
                color="secondary"
                className={classes.button}
                component={Link}
                to="/"
              >
                <Home className={classes.icon} />
              </IconButton>
            </Tooltip>
            {user.auth ? (
              <>
                <Tooltip title="Wyszukaj">
                  <IconButton color="secondary" className={classes.button}>
                    <Search className={classes.icon} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Dodaj cos tam nie wiem jeszcze co">
                  <IconButton color="secondary" className={classes.button}>
                    <AddCircle className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </Grid>
          <Grid
            item
            xs={user.auth ? 6 : 8}
            className={user.auth ? classes.userInterfaceGrid : null}
          >
            {user.auth ? <LoggedInLinks /> : <LoggedOutLinks />}
          </Grid>
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
