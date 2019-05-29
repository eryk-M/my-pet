import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile/UserProfile";
import NavBar from "./components/NavBar";
import Main from "./pages/Main";
//MUI
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import mainTheme from "./styles/theme";

import "./App.css";

const theme = createMuiTheme(mainTheme);

class App extends Component {
  state = {};
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" exact component={UserProfile} />
              <Route path="/profile/password" exact component={UserProfile} />
              <Route path="/profile/:nickName" exact component={Profile} />
              <Route path="/main" exact component={Main} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
