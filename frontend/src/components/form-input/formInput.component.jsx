import "./formInput.style.css";

const FormInput = ({ label, handleChange, ...otherProps }) => (
  <div className="input-group">
    <input className="form-input" {...otherProps} onChange={handleChange} />
    <label className={`${otherProps.value ? "value" : ""}`}>{label}</label>
  </div>
);

export default FormInput;
