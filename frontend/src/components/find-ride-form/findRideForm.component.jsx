import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import CustomButton from "../buttons/customButton.component";
import FormInput from "../form-input/formInput.component";
import Table from "../table/table.component";
import api from "../../services/api";
import "./findRideForm.style.css";

class FindRideForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "",
      rides: [],
      show: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { from, to } = this.state;
    try {
      const response = await api.get(`/searchrides/?depature=${from}&destination=${to}`);
      if (Array.isArray(response.data)) {
        this.setState({ rides: response.data, show: true });
      } else {
        swal({
          title: response.data,
          icon: "error",
          button: "ok",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  closeRides = () => {
    this.setState({ show: false });
  }

  render() {
    const { firstName } = this.props.currentUser;
    const { from, to, show, rides } = this.state;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-inputs">
          <FormInput
            type="text"
            name="from"
            label="From"
            value={from}
            handleChange={this.handleChange}
          />
          <FormInput
            type="text"
            name="to"
            label="To"
            value={to}
            handleChange={this.handleChange}
          />
        </div>
        <div className="form-buttons">
          <CustomButton>Find a Ride</CustomButton>
          <Link to={firstName ? "/dashboard/post" : "/signin"}>
            <CustomButton>Post a Trip</CustomButton>
          </Link>
        </div>
        {
          show === true ? <div className="search-result">
            <i className="fas fa-window-close close" onClick={this.closeRides}></i>
            <Table rides={rides} />
          </div> : null
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(FindRideForm);
