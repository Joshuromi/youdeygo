import React from "react";
import "./displayTrips.style.css";

class DisplayTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => this.setState({ infos: json }));
  }

  render() {
    const { infos } = this.state;
    console.log(infos);
    return (
      <table>
        <caption>All Trips</caption>
        <thead>
          <tr>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Amount(₦)</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {infos.map((info) => (
            <tr key={info.id}>
              <td data-label="From">{info.address.street}</td>
              <td data-label="To">{info.address.city}</td>
              <td data-label="Amount(₦)">1,190</td>
              <td data-label="Date">03/01/2016</td>
              <td data-label="Time">Time</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DisplayTrips;
