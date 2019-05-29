import React, { Component } from "react";

import UserNav from "./UserNav";
import EditProfile from "./EditProfile";
import Settings from "./Settings";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAuthUser } from "../../store/actions/authActions";
import withStyles from "@material-ui/core/styles/withStyles";
//mui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
  ...theme,
  cardUser: {
    width: "70%",
    margin: "100px auto 0"
  },
  navGrid: {
    borderRight: "1px solid rgba(0,0,0,0.2)"
  },
  mainProfileContent: {
    paddingLeft: 50
  }
});

class UserProfile extends Component {
  state = {};

  componentDidMount() {
    // this.props.getAuthUser();
  }
  render() {
    const { classes, user } = this.props;
    if (!user.auth) {
      this.props.history.push("/login");
    }
    return (
      <Card className={classes.cardUser}>
        <CardContent>
          <Grid container>
            <Grid item xs={3} className={classes.navGrid}>
              <UserNav match={this.props.match} />
            </Grid>
            <Grid item xs={6} className={classes.mainProfileContent}>
              <Switch>
                <Route path="/profile/password" exact component={Settings} />
                <Route path="/profile" exact component={EditProfile} />
              </Switch>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  getAuthUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
