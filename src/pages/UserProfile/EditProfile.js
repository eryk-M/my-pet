import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

//mui

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
const styles = theme => ({
  ...theme,
  userNickname: {
    fontSize: 36,
    marginBottom: 0,
    marginLeft: 15
  },
  avatarWrapper: {
    display: "flex",
    alignItems: "center"
  }
});

class EditProfile extends Component {
  state = {};
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.avatarWrapper}>
        <Avatar src={user.details.imageUrl} className={classes.userAvatar} />
        <Typography
          paragraph
          color="secondary"
          className={classes.userNickname}
        >
          {user.details.nickName}
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(EditProfile));
