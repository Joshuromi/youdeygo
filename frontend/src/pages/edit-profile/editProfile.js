import React from "react";
import { connect } from "react-redux";

import api from "../../services/api";
import { setUser } from "../../redux/user/user.action";
import FormInput from "../../components/form-input/formInput.component";
import CustomButton from "../../components/buttons/customButton.component";

import PP from "../../assests/pp.png";
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
    };
  }

  componentDidMount() {
    const {
      currentUser: { firstName, lastName, email, phoneNumber, address },
    } = this.props;
    this.setState({ firstName, lastName, email, phoneNumber, address });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, email, phoneNumber, address } = this.state;

    return (
      <div className="edit-profile">
        <div className="user-info">
          <div className="profile-pics">
            <img src={PP} alt="profile pics" />
          </div>
          <div className="user-details">
            <p>Name: {`${firstName} ${lastName}`}</p>
            <p>Email: {email}</p>
            <p>Mobile: {phoneNumber}</p>
            <p>Address: {address}</p>
          </div>
        </div>
        <div className="edit-form">
          <form>
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
