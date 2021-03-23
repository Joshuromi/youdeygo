import React from "react";
import "./dashboard.style.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboard">
        <div className="row">
          <diV></diV>
          <div className="notification"></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
