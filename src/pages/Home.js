import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Home extends Component {
  state = {};
  render() {
    const { user } = this.props;
    if (user.auth) return <Redirect to="/main" />;
    return (
      <div>
        <h1>Home page</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
