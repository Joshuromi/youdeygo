import { connect } from "react-redux";
import Table from "../../components/table/table.component";
import "./yourTrips.style.css";

const YourTrips = ({ userRides }) => (
  <div>
    <h2>YOUR TRIPS</h2>
    <Table rides={userRides} />
  </div>
);

const mapStateToProps = (state) => ({
  userRides: state.rides.userRides,
});

export default connect(mapStateToProps)(YourTrips);
