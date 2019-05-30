import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
//MUI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField/TextField";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
//icons
import Close from "@material-ui/icons/CloseRounded";
import AddCircle from "@material-ui/icons/AddCircleOutline";

const styles = theme => ({
  ...theme,
  iconClose: {
    position: "absolute",
    top: 10,
    right: 10,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

class AddPhoto extends Component {
  state = {
    open: false,
    body: ""
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Tooltip title="Dodaj cos tam nie wiem jeszcze co">
          <IconButton
            color="secondary"
            className={classes.button}
            onClick={this.handleOpen}
          >
            <AddCircle className={classes.icon} onClick={this.handleOpen} />
          </IconButton>
        </Tooltip>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <Close className={classes.iconClose} onClick={this.handleClose} />
          <DialogTitle>Dodaj zdjęcie</DialogTitle>
          <DialogContent>
            <Button
              variant="outlined"
              color="primary"
              className={classes.changePhoto}
              onClick={this.handleImageChange}
            >
              Dodaj zdjęcie
            </Button>
            <DialogContentText>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
              tempore iure cupiditate
            </DialogContentText>
            <TextField
              id="outlined-multiline-static"
              label="Opis"
              multiline
              rows="4"
              name="body"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              fullWidth
            />
            <Button color="secondary" variant="contained">
              Dodaj
            </Button>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default connect(
  null,
  null
)(withStyles(styles)(AddPhoto));
