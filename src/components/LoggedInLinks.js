import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../store/actions/authActions";
//mui
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import Tooltip from "@material-ui/core/Tooltip";
//icon
import Input from "@material-ui/icons/InputRounded";
import Notifications from "@material-ui/icons/NotificationsRounded";
const styles = theme => ({
  ...theme,

  userAvatar: {
    marginRight: 5,
    marginTop: 5
  },
  userInterface: {
    display: "flex"
  }
});

class LoggedInLinks extends Component {
  state = {};

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.userInterface}>
        {user.details ? (
          <Link to="/profile" className={classes.userLink}>
            <Tooltip title="Profil">
              <Avatar
                src={user.details.imageUrl}
                className={classes.userAvatar}
              />
            </Tooltip>
          </Link>
        ) : (
          <p style={{ color: "white" }}>Wczytywanie...</p>
        )}
        <Tooltip title="Powiadomienia">
          <IconButton color="secondary" className={classes.button}>
            <Notifications />
          </IconButton>
        </Tooltip>
        <Tooltip title="Wyloguj się">
          <IconButton
            color="secondary"
            className={classes.button}
            onClick={this.handleLogout}
            component={Link}
            to="/"
          >
            <Input />
          </IconButton>
        </Tooltip>
      </div>
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
