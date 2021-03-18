import React from "react";
import FormInput from "../form-input/formInput.component";
import CustomButton from "../buttons/customButton.component";
import "./signin.style.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2 className="title">Sign in</h2>
        <p>
          Already have an account? Sign in here with your email and password
        </p>
        <form className="signin-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Your Password"
            value={password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;