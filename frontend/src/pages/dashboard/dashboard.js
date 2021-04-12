import { Switch, Route } from "react-router-dom";
// import { connect } from "react-redux";

import Sidebar from "../../components/sidebar/sidebar.component";
import YourTrips from "../your-trips/yourTrips";
import FindRide from "../find-ride/findRide";
import PostRide from "../post-ride/postRide";
import AllTrips from "../all-trips/allTrips";
import EditProfile from "../edit-profile/editProfile";

import "./dashboard.style.css";

const Dashboard = ({ firstName, lastName }) => (
  <div className="dashboard">
    <Sidebar displayName={firstName} />
    <div className="informations">
      <h3>Welcome, {`${firstName} ${lastName}`}</h3>
      <div className="routes">
        <Switch>
          <Route exact path="/dashboard" component={YourTrips} />
          <Route path="/dashboard/find" component={FindRide} />
          <Route path="/dashboard/post" component={PostRide} />
          <Route path="/dashboard/alltrips" component={AllTrips} />
          <Route path="/dashboard/editprofile" component={EditProfile} />
        </Switch>
      </div>
    </div>
  </div>
);

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// export default connect(mapStateToProps)(Dashboard);

export default Dashboard;
