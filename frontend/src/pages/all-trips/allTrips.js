import React from "react";
import api from "../../services/api";
import Table from "../../components/table/table.component";
import "./allTrips.style.css";

class AllTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRides: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await api.get("/rides");
      this.setState({ allRides: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { allRides } = this.state;
    return (
      <div>
        <h2>Available Trips</h2>
        <Table rides={allRides} />
      </div>
    );
  }
}

export default AllTrips;
