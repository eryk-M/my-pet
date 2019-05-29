import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { getAuthUser, uploadImage } from "../../store/actions/authActions";

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
    display: "inline-block"
    // textAlign: "left"
  },
  userInfoTextField: {
    // display: "inline-block"
    marginTop: 15
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
  //   componentDidUpdate() {
  //     if (this.props.user.details.firstName !== this.state.firstName) {
  //       this.setState({
  //         nickName: this.props.user.details.nickName,
  //         firstName: this.props.user.details.firstName,
  //         lastName: this.props.user.details.lastName,
  //         email: this.props.user.details.email,
  //         petName: this.props.user.details.petName
  //       });
  //     }
  //   }

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
  render() {
    const { classes, user } = this.props;
    const { nickName, firstName, lastName, email, petName } = this.state;
    return (
      <Fragment>
        <div className={classes.avatarWrapper}>
          <Avatar src={user.details.imageUrl} className={classes.userAvatar} />
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
        <form noValidate>
          <div>
            <TextField
              name="nickName"
              label="Pseudonim"
              value={nickName}
              className={classes.userInfoTextField}
              onChange={this.handleChange}
            />
          </div>
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
              name="email"
              label="E-mail"
              value={email}
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
          <Button
            color="secondary"
            variant="contained"
            className={classes.loginButton}
          >
            Zapisz
          </Button>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = {
  getAuthUser,
  uploadImage
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditProfile));
