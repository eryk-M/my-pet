import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authActions";
//mui
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//icon
import Input from "@material-ui/icons/InputRounded";
import Notifications from "@material-ui/icons/NotificationsRounded";
const styles = theme => ({
  ...theme,

  userAvatar: {
    marginRight: 5,
    marginTop: 5,
    "&:hover": {
      cursor: "pointer"
    }
  },
  userInterface: {
    display: "flex"
  },
  profileMenu: {
    top: 50,
    left: -25
  }
});

class LoggedInLinks extends Component {
  state = {
    anchorEl: null
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  handleMenu = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.userInterface}>
        {user.details ? (
          <>
            <Tooltip title="Profil">
              <Avatar
                src={user.details.imageUrl}
                className={classes.userAvatar}
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
              />
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              className={classes.profileMenu}
            >
              <MenuItem
                component={Link}
                to={`/profile/${user.details.nickName}`}
                onClick={this.handleClose}
                selected={
                  window.location.pathname ===
                  `/profile/${user.details.nickName}`
                    ? true
                    : false
                }
              >
                Profil
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                onClick={this.handleClose}
                selected={
                  window.location.pathname === "/profile" ? true : false
                }
              >
                Moje konto
              </MenuItem>
            </Menu>
          </>
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
