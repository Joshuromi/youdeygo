import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar.component";
import Form from "../../components/form/form.component";
import YourTrips from "../your-trips/yourTrips";
import AllTrips from "../all-trips/allTrips";
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
            <Route exact path="/dashboard" component={YourTrips} />
            <Route path="/dashboard/alltrips" component={AllTrips} />
            <Route path="/dashboard/postorfind" component={Form} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
