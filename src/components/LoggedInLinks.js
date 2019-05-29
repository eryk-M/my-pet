import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../store/actions/authActions";
//mui
import Button from "@material-ui/core/Button/Button";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
  ...theme,
  userName: {
    color: "#fff",
    textTransform: "capitalize",
    marginLeft: 10
  },
  userAvatar: {
    marginLeft: 10
  },
  userLink: {
    display: "flex",
    alignItems: "center"
  }
});

class LoggedInLinks extends Component {
  state = {};

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const { classes, user } = this.props;
    console.log(user.details);
    return (
      <>
        {/* <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          component={Link}
          to="/profile"
        >
          Profil
        </Button> */}
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
        {user.details ? (
          <Link to="/profile" className={classes.userLink}>
            <Avatar
              src={user.details.imageUrl}
              className={classes.userAvatar}
            />
            <Typography variant="subtitle1" className={classes.userName}>
              {user.details.firstName} {user.details.lastName}
            </Typography>
          </Link>
        ) : (
          <p style={{ color: "white" }}>Wczytywanie...</p>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoggedInLinks));
