import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { changePassword } from "../../store/actions/authActions";
//mui
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
  ...theme
});
class Settings extends Component {
  state = {
    currentPassword: "",
    newPassword: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.changePassword(this.state);
  };
  render() {
    const { classes } = this.props;
    const { currentPassword, newPassword } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <div>
          <TextField
            name="currentPassword"
            label="Aktualne hasło"
            value={currentPassword}
            className={classes.userInfoTextField}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            name="newPassword"
            label="nowe hasło"
            value={newPassword}
            className={classes.userInfoTextField}
            onChange={this.handleChange}
          />
        </div>
        <button>submit</button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  changePassword
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Settings));
