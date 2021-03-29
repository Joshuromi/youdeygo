import "./table.style.css";

// driverName: String,
//   driverPhone: String,
//   carName: String,
//   plateNumber: String,
//   depature: String,
//   destination: String,
//   time: String,
//   scheduleDate: String,
//   seats: Number,
//   cost: Number,
//   description: String,
//   createdAt: String,
//   updatedAt: String,

const Table = ({ rides }) => (
  <table>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Car Name</th>
        <th scope="col">Plate NO.</th>
        <th scope="col">Seats</th>
        <th scope="col">From</th>
        <th scope="col">To</th>
        <th scope="col">Date</th>
        <th scope="col">Time</th>
        <th scope="col">Amount (₦)</th>
      </tr>
    </thead>
    <tbody>
      {rides.map((ride) => (
        <tr key={ride._id}>
          <td data-label="Name">{ride.driverName}</td>
          <td data-label="Car Name">{ride.carName}</td>
          <td data-label="Plate NO.">{ride.plateNumber}</td>
          <td data-label="Seats">{ride.seats}</td>
          <td data-label="From">{ride.depature}</td>
          <td data-label="To">{ride.destination}</td>
          <td data-label="Date">{ride.scheduleDate}</td>
          <td data-label="Time">{ride.time}</td>
          <td data-label="Amount(₦)">{ride.cost}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
