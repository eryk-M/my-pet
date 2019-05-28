import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//mui
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  ...theme
});

class LoggedOutLinks extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    return (
      <>
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
      </>
    );
  }
}

export default withStyles(styles)(LoggedOutLinks);
