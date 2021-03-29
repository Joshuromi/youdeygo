import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import jwt from "jwt-decode";
import swal from "sweetalert";

import api from "../../services/api";
import FormInput from "../form-input/formInput.component";
import CustomButton from "../buttons/customButton.component";
import { setUser } from "../../redux/user/user.action";

import "./signin.style.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token || false;

      if (token) {
        const { history } = this.props;
        const user = jwt(token);
        user.token = token;
        this.props.setUser(user);
        swal({
          title: "Sign In Successful",
          icon: "success",
          button: "ok",
        });
        history.push("/dashboard");
      } else {
        setTimeout(() => this.setState({ error: response.data.message }), 3000);
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
    const { email, password, error } = this.state;
    return (
      <div className="sign-in">
        <h2 className="title">Sign in</h2>
        <p>
          Already have an account? Sign in here with your email and password
        </p>
        <div className="error">{error ? <p>{error}</p> : null}</div>
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

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
