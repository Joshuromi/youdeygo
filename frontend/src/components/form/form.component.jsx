import React from "react";
import CustomButton from "../buttons/customButton.component";
import FormInput from "../form-input/formInput.component";
import "./form.style.css";

class Form extends React.Component {
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
          <CustomButton>Post a Trip</CustomButton>
        </div>
      </form>
    );
  }
}

export default Form;
