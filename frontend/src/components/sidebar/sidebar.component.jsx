import { Link } from "react-router-dom";
import "./sidebar.style.css";
import Pp from "../../assests/pp.png";

const handleTabs = (event) => {
  if (event.target.classList.contains("tab")) {
    const tabs = [...document.getElementsByClassName("tab")];
    tabs.forEach((tab) => tab.classList.remove("active"));
    event.target.classList.add("active");
  }
};

const Sidebar = ({ displayName }) => (
  <div className="sidebar">
    <div className="profile-img">
      <img src={Pp} alt="profile" />
      <Link to="/dashboard/editprofile">
        <p>
          <i className="fas fa-edit"> {displayName}</i>
        </p>
      </Link>
    </div>
    <div className="tabs">
      <Link to="/dashboard">
        <div className="tab" onClick={handleTabs}>
          <i className="fas fa-suitcase-rolling"></i>Your Trips
        </div>
      </Link>
      <Link to="/dashboard/find">
        <div className="tab" onClick={handleTabs}>
          <i className="fas fa-search-location"></i>Find Ride
        </div>
      </Link>
      <Link to="/dashboard/post">
        <div className="tab" onClick={handleTabs}>
          <i className="fas fa-car"></i>Post Ride
        </div>
      </Link>
      <Link to="/dashboard/alltrips">
        <div className="tab" onClick={handleTabs}>
          <i className="fas fa-globe-africa"></i>All Trips
        </div>
      </Link>
    </div>
  </div>
);

export default Sidebar;
