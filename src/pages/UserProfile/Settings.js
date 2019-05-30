import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { changePassword } from "../../store/actions/authActions";
import Loader from "../../components/UI/Loader";
//mui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  ...theme,
  userChangePassword: {
    marginTop: 10
  },
  changePasswordButton: {
    marginTop: 20
  }
});
class Settings extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    error: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { newPassword, confirmPassword } = this.state;
    e.preventDefault();
    if (newPassword === confirmPassword) {
      if (newPassword.length < 6 || confirmPassword < 6) {
        this.setState({
          error: "Hasło musi miec conajmniej 6 znakow"
        });
      } else {
        this.setState({
          error: ""
        });
        const data = {
          newPassword,
          confirmPassword
        };
        this.props.changePassword(data);
      }
    } else {
      this.setState({
        error: "Hasła się nie zgadzają"
      });
    }
  };
  render() {
    const { classes, user, loading } = this.props;
    const { error } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit} className="form-password">
        {user.message ? <p style={{ color: "green" }}>{user.message}</p> : null}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div>
              <TextField
                name="newPassword"
                label="Nowe hasło"
                type="password"
                helperText={error}
                error={error ? true : false}
                className={classes.userChangePassword}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                name="confirmPassword"
                type="password"
                label="Powtórz nowe hasło"
                helperText={error}
                error={error ? true : false}
                className={classes.userChangePassword}
                onChange={this.handleChange}
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.loginButton}
        >
          submit
        </Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  loading: state.user.loading
});

const mapDispatchToProps = {
  changePassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Settings));
