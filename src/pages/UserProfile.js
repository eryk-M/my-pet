import React, { Component } from "react";

import { connect } from "react-redux";

class UserProfile extends Component {
  state = {};

  componentDidMount() {}

  render() {
    if (!this.props.user.auth) {
      this.props.history.push("/login");
    }
    return (
      <div>
        <h1>User Profile</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserProfile);
