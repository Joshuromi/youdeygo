import CustomButton from "../buttons/customButton.component";
import "./form.style.css";

const Form = () => (
  <form className="form">
    <div className="form-inputs">
      <div className="input-group">
        <input className="form-input" type="text" name="from" />
        <label>From</label>
      </div>
      <div className="input-group">
        <input className="form-input" type="text" name="to" />
        <label>To</label>
      </div>
      <div className="input-group">
        <input className="form-input" type="date" name="date" />
      </div>
    </div>
    <div className="form-buttons">
      <CustomButton>Find a Ride</CustomButton>
      <CustomButton>Post a Trip</CustomButton>
    </div>
  </form>
);

export default Form;
