import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "../buttons/customButton.component";
import FormInput from "../form-input/formInput.component";
import "./findRideForm.style.css";

class FindRideForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      date: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName } = this.props.currentUser;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-inputs">
          <FormInput
            type="text"
            name="from"
            label="From"
            value={this.state.from}
            handleChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="to"
            label="To"
            value={this.state.to}
            handleChange={this.handleChange}
          />
          <FormInput
            type="date"
            name="date"
            value={this.state.date}
            handleChange={this.handleChange}
          />
        </div>
        <div className="form-buttons">
          <CustomButton>Find a Ride</CustomButton>
          <Link to={firstName ? "/dashboard/post" : "/signin"}>
            <CustomButton>Post a Trip</CustomButton>
          </Link>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FindRideForm);
