import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
//mui
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

//icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import Https from "@material-ui/icons/Https";

const styles = theme => ({
  ...theme,
  icon: {
    marginRight: 15
  }
});

const UserNav = props => {
  const { classes } = props;

  return (
    <MenuList>
      <MenuItem
        component={Link}
        to="/profile"
        selected={props.match.path === "/profile"}
      >
        <AccountCircle className={classes.icon} />
        Edytuj profil
      </MenuItem>
      <MenuItem
        component={Link}
        to="/profile/password"
        selected={props.match.path === "/profile/password"}
      >
        <Https className={classes.icon} />
        Zmień hasło
      </MenuItem>
    </MenuList>
  );
};

export default withStyles(styles)(UserNav);
