import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar.component";
import Form from "../../components/form/form.component";
import DisplayTrips from "../../components/display-trips/displayTrips.component";
import "./dashboard.style.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="informations">
          <Switch>
            <Route exact path="/dashboard" component={Form} />
            <Route path="/dashboard/trips" component={DisplayTrips} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
