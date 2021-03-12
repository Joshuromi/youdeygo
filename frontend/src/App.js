import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";
import LandingPage from "./pages/landing/landingPage";
import "./App.css";

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </div>
);

export default App;
