import { Switch, Route } from "react-router-dom";
// import { connect } from "react-redux";

import Sidebar from "../../components/sidebar/sidebar.component";
import Form from "../../components/form/form.component";
import YourTrips from "../your-trips/yourTrips";
import AllTrips from "../all-trips/allTrips";

import "./dashboard.style.css";

const Dashboard = ({ firstName, lastName }) => (
  <div className="dashboard">
    <Sidebar displayName={firstName} />
    <div className="informations">
      <h3>Welcome, {`${firstName} ${lastName}`}</h3>
      <Switch>
        <Route exact path="/dashboard" component={YourTrips} />
        <Route path="/dashboard/alltrips" component={AllTrips} />
        <Route path="/dashboard/postorfind" component={Form} />
      </Switch>
    </div>
  </div>
);

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// export default connect(mapStateToProps)(Dashboard);

export default Dashboard;
