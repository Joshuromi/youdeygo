import React from "react";
import jwt from "jwt-decode";
import FormInput from "../form-input/formInput.component";
import CustomButton from "../buttons/customButton.component";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import "./signup.style.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = this.state;

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
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const token = response.data.token || false;
      const user = jwt(token);

      console.log(response.data);

      if (token) {
        localStorage.setItem("token", JSON.stringify(user));
        history.push("/dashboard");
      } else {
        this.setState({ error: response.data.message });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
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
