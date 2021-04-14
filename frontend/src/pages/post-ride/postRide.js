import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

import CustomButton from "../../components/buttons/customButton.component";
import FormInput from "../../components/form-input/formInput.component";
import { setRide } from "../../redux/rides/rides.action";
import api from "../../services/api";
import "./postRide.style.css";

class PostRide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carName: "",
      plateNumber: "",
      seats: "",
      depature: "",
      destination: "",
      price: "",
      scheduleDate: "",
      time: "",
      description: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const token = this.props.currentUser.token;

    try {
      const response = await api.post("/rides", this.state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ride = response.data.ride || false;

      if (ride) {
        console.log(ride, response.data);
        const { history } = this.props;
        this.props.setRide(ride);
        swal({
          title: "Successful",
          icon: "success",
          button: "ok",
        });
        history.push("/dashboard");
      } else {
        swal({
          title: response.data.message,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Something Went Wrong",
        text: "Please Try Again",
        icon: "error",
        button: "ok",
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      carName,
      plateNumber,
      depature,
      destination,
      time,
      scheduleDate,
      seats,
      price,
      description,
    } = this.state;
    return (
      <div className="post-ride">
        <h2 className="pr-intro-text">Post a Ride</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="pr-form-inputs">
            <FormInput
              type="text"
              name="carName"
              label="Car Name"
              value={carName}
              handleChange={this.handleChange}
            />
            <FormInput
              type="text"
              name="plateNumber"
              label="Plate Number"
              value={plateNumber}
              handleChange={this.handleChange}
            />
            <FormInput
              type="number"
              name="seats"
              value={seats}
              label="Available Seats"
              handleChange={this.handleChange}
            />
            <FormInput
              type="text"
              name="depature"
              value={depature}
              label="From"
              handleChange={this.handleChange}
            />
            <FormInput
              type="text"
              name="destination"
              value={destination}
              label="To"
              handleChange={this.handleChange}
            />
            <FormInput
              type="number"
              name="price"
              value={price}
              label="Amount(₦)"
              handleChange={this.handleChange}
            />
            <FormInput
              type="date"
              name="scheduleDate"
              value={scheduleDate}
              handleChange={this.handleChange}
            />
            <FormInput
              type="text"
              name="time"
              value={time}
              label="Time (Format - 10:25 pm)"
              handleChange={this.handleChange}
            />
            <textarea
              type="text"
              name="description"
              value={description}
              placeholder="Description"
              onChange={this.handleChange}
            ></textarea>
          </div>
          <div className="pr-form-buttons">
            <CustomButton>Post a Trip</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setRide: (ride) => dispatch(setRide(ride)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostRide));
