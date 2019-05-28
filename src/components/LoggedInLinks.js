import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../store/actions/authActions";
//mui
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  ...theme
});

class LoggedInLinks extends Component {
  state = {};

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/profile"
        >
          Profil
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={this.handleLogout}
          component={Link}
          to="/"
        >
          Wyloguj się
        </Button>
      </>
    );
  }
}

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(LoggedInLinks));
