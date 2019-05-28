import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getUserDetails } from "../store/actions/authActions";

const styles = theme => ({
  ...theme,
  profileImage: {
    height: 100,
    width: 100
  }
});

class Profile extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    // console.log(this.props.location.pathname.substr(9));
    this.props.getUserDetails(this.props.location.pathname.substr(9));
  }

  // componentDidUpdate() {
  //   console.log(this.props.user);
  // }
  render() {
    const { classes } = this.props;
    const { user } = this.props.user.data;

    return (
      <div>
        <h1>Profile page</h1>

        {user && (
          <>
            <img
              src={user.imageUrl}
              className={classes.profileImage}
              alt="Zdjęcie profilowe"
            />
            <p>Pseudonim: {user.nickName}</p>
            <p>Pet: {user.petName}</p>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getUserDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
