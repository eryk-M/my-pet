import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  getAuthUser,
  uploadImage,
  editUserDetails,
  clearMessagesAndErrors
} from "../../store/actions/authActions";
import Loader from "../../components/UI/Loader";
//mui
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
  },
  changePhoto: {
    fontSize: 10,
    marginTop: 15
  },
  userInfo: {
    fontSize: 16,
    marginTop: 15,
    display: "block"
    // textAlign: "left"
  },
  userInfoTextField: {
    // display: "inline-block"
    marginTop: 15
  },
  bigAvatar: {
    width: 100,
    height: 100,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class EditProfile extends Component {
  state = {
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    petName: ""
  };

  componentDidMount() {
    this.props.clearMessagesAndErrors();
    this.props.getAuthUser();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.user.details.firstName !== this.state.firstName) {
      this.setState({
        nickName: nextProps.user.details.nickName,
        firstName: nextProps.user.details.firstName,
        lastName: nextProps.user.details.lastName,
        email: nextProps.user.details.email,
        petName: nextProps.user.details.petName
      });
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleImageSubmit = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleImageChange = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleFormSubmit = e => {
    e.preventDefault();
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      petName: this.state.petName
    };
    if (userData.firstName && userData.lastName && userData.petName) {
      this.props.editUserDetails(userData);
    }
  };
  render() {
    const { classes, user, loading, errors } = this.props;
    const { nickName, firstName, lastName, email, petName } = this.state;
    return (
      <Fragment>
        <div className={classes.avatarWrapper}>
          <Avatar
            src={user.details.imageUrl}
            className={classes.bigAvatar}
            onClick={this.handleImageChange}
          />
          <Typography
            component="span"
            color="secondary"
            className={classes.userNickname}
          >
            {user.details.nickName}
          </Typography>
        </div>
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={this.handleImageSubmit}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.changePhoto}
          onClick={this.handleImageChange}
        >
          Zmień zdjęcie profilowe
        </Button>
        {errors ? <p style={{ color: "red" }}>{errors.error}</p> : null}
        {user.message ? <p style={{ color: "green" }}>{user.message}</p> : null}
        <div>
          <Typography className={classes.userInfo}>
            Pseudonim: {nickName}
          </Typography>
          <Typography className={classes.userInfo}>
            Twój adres email: {email}
          </Typography>
        </div>

        <form noValidate onSubmit={this.handleFormSubmit} className="save-form">
          {loading && !errors.error ? (
            <Loader />
          ) : (
            <>
              <div>
                <TextField
                  name="firstName"
                  label="Imię"
                  value={firstName}
                  className={classes.userInfoTextField}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <TextField
                  name="lastName"
                  label="Nazwisko"
                  value={lastName}
                  className={classes.userInfoTextField}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <TextField
                  name="petName"
                  label="Imię peta twego"
                  value={petName}
                  className={classes.userInfoTextField}
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
            disabled={loading}
          >
            Zapisz
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  loading: state.user.loading,
  errors: state.user.errors
});
const mapDispatchToProps = {
  getAuthUser,
  uploadImage,
  editUserDetails,
  clearMessagesAndErrors
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditProfile));
