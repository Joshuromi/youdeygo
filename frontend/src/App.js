import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { removeUser } from "./redux/user/user.action";

import Header from "./components/header/header.component";
import LandingPage from "./pages/landing/landingPage";
import SignupAndSignin from "./pages/signup-and-signin/signupAndSignin";
import Dashboard from "./pages/dashboard/dashboard";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      currentUser: { firstName, lastName },
    } = this.props;
    const { removeUser } = this.props;
    return (
      <div className="app">
        <Header firstName={firstName} removeUser={removeUser} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/signin"
            render={() =>
              firstName ? <Redirect to="/dashboard" /> : <SignupAndSignin />
            }
          />
          <Route
            path="/dashboard"
            render={() =>
              !firstName ? (
                <Redirect to="/signin" />
              ) : (
                <Dashboard firstName={firstName} lastName={lastName} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchtoProps = (dispatch) => ({
  removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
