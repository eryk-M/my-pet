import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../assets/images/pet-logo.png";
import { Link } from "react-router-dom";
//UI
import Loader from "../components/UI/Loader";
//MUI
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import { connect } from "react-redux";
import { postLogin } from "../store/actions/authActions";

const styles = theme => ({
  ...theme
});

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.postLogin(data, this.props.history);
  };
  render() {
    const { classes, loading, errors } = this.props;
    console.log(this.props.errors);
    return (
      <>
        <img src={Logo} alt="MyPetLogo" className={classes.loginLogo} />
        <Typography align="center" variant="h3" className={classes.loginTypo}>
          Logowanie
        </Typography>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body2">
              test@test.pl / test123
            </Typography>
            <form
              noValidate
              onSubmit={this.handleSubmit}
              className="login-page"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className={classes.loginInput}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Hasło"
                    className={classes.loginInput}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </>
              )}
              {errors.general && (
                <Typography
                  variant="body"
                  align="center"
                  classes={classes.customError}
                >
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.loginButton}
                disabled={loading}
              >
                Zaloguj się
              </Button>

              <span className={classes.loginSpan}>
                Nie masz konta? <Link to="/register">Zarejestruj się</Link>
              </span>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}
//todo
Login.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.user.loading,
  errors: state.user.errors
});

const mapDispatchToProps = {
  postLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
