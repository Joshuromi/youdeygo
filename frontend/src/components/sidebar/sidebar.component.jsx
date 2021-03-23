import { Link } from "react-router-dom";
import "./sidebar.style.css";
import Pp from "../../assests/pp.png";

const Sidebar = () => (
  <div className="sidebar">
    <div className="profile-img">
      <img src={Pp} alt="profile" />
      <p>DisplayName</p>
    </div>
    <div className="tabs">
      <Link to="/dashboard">
        <div className="tab">
          <span>Your Trips</span>
        </div>
      </Link>
      <Link to="/dashboard/alltrips">
        <div className="tab">
          <span>All Trips</span>
        </div>
      </Link>
      <Link to="/dashboard/postorfind">
        <div className="tab">
          <span>Find/Post Trip</span>
        </div>
      </Link>
    </div>
  </div>
);

export default Sidebar;
