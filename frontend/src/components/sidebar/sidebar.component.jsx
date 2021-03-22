import "./sidebar.style.css";
import Pp from "../../assests/pp.png";

const Sidebar = () => (
  <div className="sidebar">
    <div className="profile-img">
      <img src={Pp} alt="profile" />
      <p>DisplayName</p>
    </div>
    <div className="tabs">
      <div className="tab">
        <span>YOUR TRIPS</span>
      </div>
      <div className="tab">
        <span>SEARCH</span>
      </div>
      <div className="tab">
        <span>POST / FIND</span>
      </div>
    </div>
  </div>
);

export default Sidebar;
