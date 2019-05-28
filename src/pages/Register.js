import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import PropTypes from "prop-types";
import Logo from "../assets/images/pet-logo.png";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postRegister } from "../store/actions/authActions";
import Loader from "../components/UI/Loader";
//MUI
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  ...theme
});

class Register extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    firstName: "",
    lastName: "",
    petName: "",
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
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      nickName: this.state.nickName,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      petName: this.state.petName
    };
    this.props.postRegister(data, this.props.history);
  };
  render() {
    const { classes, errors, loading } = this.props;
    return (
      <>
        <img src={Logo} alt="MyPetLogo" className={classes.loginLogo} />
        <Typography align="center" variant="h3" className={classes.loginTypo}>
          Rejestracja
        </Typography>
        <Card className={classes.card}>
          <CardContent>
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
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Potwierdź hasło"
                    className={classes.loginInput}
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="nickName"
                    name="nickName"
                    type="text"
                    label="Twoj pseudonim"
                    className={classes.loginInput}
                    helperText={errors.nickName}
                    error={errors.nickName ? true : false}
                    value={this.state.nickName}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="firstName"
                    name="firstName"
                    type="text"
                    label="Imię"
                    className={classes.loginInput}
                    helperText={errors.firstName}
                    error={errors.firstName ? true : false}
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="lastName"
                    name="lastName"
                    type="text"
                    label="Nazwisko"
                    className={classes.loginInput}
                    helperText={errors.lastName}
                    error={errors.lastName ? true : false}
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="petName"
                    name="petName"
                    type="text"
                    label="Imię zwierząęąąćitka"
                    className={classes.loginInput}
                    helperText={errors.petName}
                    error={errors.petName ? true : false}
                    value={this.state.petName}
                    onChange={this.handleChange}
                    fullWidth
                  />
                </>
              )}
              {errors.general && (
                <Typography variant="body" classes={classes.customError}>
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
                Zarejestruj się
              </Button>
            </form>
          </CardContent>
        </Card>
      </>
    );
  }
}
//todo
Register.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.user.loading,
  errors: state.user.errors
});

const mapDispatchToProps = {
  postRegister
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Register));
