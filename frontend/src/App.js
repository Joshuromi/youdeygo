import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.component";
import LandingPage from "./pages/landing/landingPage";
import SignupAndSignin from "./pages/signup-and-signin/signupAndSignin";
import Dashboard from "./pages/dashboard/dashboard";

import "./App.css";

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/signin" component={SignupAndSignin} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </div>
);

export default App;
