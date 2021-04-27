import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import api from "../../services/api";
import { setUser } from "../../redux/user/user.action";
import FormInput from "../../components/form-input/formInput.component";
import CustomButton from "../../components/buttons/customButton.component";
import ProfilePicture from "../../components/profile-picture/profilePicture.component";

import "./editProfile.style.css";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      toggle: false,
    };
  }

  componentDidMount() {
    const {
      currentUser: { firstName, lastName, email, phoneNumber, address },
    } = this.props;
    this.setState({ firstName, lastName, email, phoneNumber, address });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, phoneNumber, address } = this.state;

    try {
      const token = this.props.currentUser.token;

      const response = await api.put(
        "/edit",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      swal({
        title: response.data.message,
        // icon: "success",
        button: "ok",
      });

      const user = { firstName, lastName, email, phoneNumber, address, token };

      this.props.setUser(user);

      console.log(response);
      this.toggleEdit();
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

  toggleEdit = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      toggle,
    } = this.state;

    const { currentUser } = this.props;

    return (
      <div className="edit-profile">
        <div className="user-info">
          <ProfilePicture />
          <div className="user-details">
            <p>Name: {`${currentUser.firstName} ${currentUser.lastName}`}</p>
            <p>Email: {currentUser.email}</p>
            <p>Mobile: {currentUser.phoneNumber}</p>
            <p>Address: {currentUser.address}</p>
          </div>
          <div className="edit" onClick={this.toggleEdit}>
            {toggle ? "Close Edit" : "Edit Profile"}
          </div>
        </div>
        {toggle === true ? (
          <div className="edit-form">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="text"
                name="firstName"
                value={firstName}
                handleChange={this.handleChange}
                label="First Name"
                required
              />
              <FormInput
                type="text"
                name="lastName"
                value={lastName}
                handleChange={this.handleChange}
                label="Last Name"
                required
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                handleChange={this.handleChange}
                label="Email"
                required
              />
              <FormInput
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                handleChange={this.handleChange}
                label="Phone Number"
                required
              />
              <FormInput
                type="text"
                name="address"
                value={address}
                handleChange={this.handleChange}
                label="Address"
                required
              />
              <CustomButton type="submit">Submit</CustomButton>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
