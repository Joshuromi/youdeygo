import React from "react";
import FormInput from "../form-input/formInput.component";
import CustomButton from "../buttons/customButton.component";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import "./signup.style.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    const { history } = this.props;

    if (password.length < 6 || password.length > 18) {
      this.setState({ error: "Password must be 6 - 18 characters" });
      setTimeout(() => this.setState({ error: "" }), 3000);
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Password does not match" });
      setTimeout(() => this.setState({ error: "" }), 3000);
      return;
    }

    try {
      const response = await api.post("/register", {
        fullName: displayName,
        email,
        password,
      });

      const userId = response.data._id || false;

      console.log(userId);

      if (userId) {
        localStorage.setItem("user", userId);
        history.push("/dashboard");
      } else {
        this.setState({ error: response.data.message });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      displayName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      error,
    } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">Sign up</h2>
        <p>Do not have an account? Sign up here with your email and password</p>
        <div className="error">{error ? <p>{error}</p> : null}</div>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            handleChange={this.handleChange}
            label="Display Name"
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
            type="password"
            name="password"
            value={password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign up</CustomButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
