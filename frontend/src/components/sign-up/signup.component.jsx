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
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ error: "Password does not match" });
      return;
    }

    const response = await api.post("/", {
      fullName: displayName,
      email,
      password,
    });

    const user = response.data || false;

    console.log(user);

    if (user) {
      localStorage.setItem("user", user);
      history.push("/dashboard");
    } else {
      this.setState({ error: response.data.message });
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword, error } = this.state;
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
