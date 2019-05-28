import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinks from "./LoggedInLinks";
import { checkAuth } from "../store/actions/authActions";
import jwt from "jwt-decode";
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
class NavBar extends Component {
  componentDidMount() {
    const token = localStorage.FBIdToken;
    if (token) {
      const decoded = jwt(token);

      if (decoded !== null) {
        this.props.checkAuth(decoded);
      }
    }
    // const decoded = jwt(token);
  }
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
  checkAuth
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
