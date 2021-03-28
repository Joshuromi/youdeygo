import { Link } from "react-router-dom";
import FindRideForm from "../../components/find-ride-form/findRideForm.component";
import CustomButton from "../../components/buttons/customButton.component";
import imageOne from "../../assests/young-africans.jpg";
import imageTwo from "../../assests/car-owner.png";
import imageThree from "../../assests/rider.jpg";
import "./landingPage.css";

const LandingPage = () => (
  <div className="landing-page">
    <div className="intro">
      <div className="intro-text">
        <h1>Find a comfortable and affordable ride going your direction</h1>
        <p>Share a ride | Make new friends | Earn cash</p>
      </div>
      <div className="form-div">
        <FindRideForm />
      </div>
    </div>
    <div className="howitworks">
      <div className="howitworks-text">
        <h2>How It Works</h2>
        <p>
          Youdego matches car owner who have empty seats with riders heading the
          same direction
        </p>
      </div>
      <div className="howitworks-description">
        <div className="car-owners card">
          <img className="image" src={imageTwo} alt="car owner" />
          <div className="howitworks-info">
            <h2>For Car Owners</h2>
            <p>Get an affordable & comfortable ride in someone's car.</p>
            <p>
              <i className="fas fa-check-circle"></i>Signup for free
            </p>
            <p>
              <i className="fas fa-check-circle"></i>Post a ride
            </p>
            <p>
              <i className="fas fa-check-circle"></i>Safe trip and reliable
              riders.
            </p>
          </div>
        </div>
        <div className="riders card">
          <img className="image" src={imageThree} alt="rider" />
          <div className="howitworks-info">
            <h2>For Riders</h2>
            <p>Get an affordable & comfortable ride in someone's car.</p>
            <p>
              <i className="fas fa-check-circle"></i>Signup for free
            </p>
            <p>
              <i className="fas fa-check-circle"></i>Find a ride
            </p>
            <p>
              <i className="fas fa-check-circle"></i>Safe and affordable trip
            </p>
          </div>
        </div>
      </div>
      <div className="howitworks-button">
        <Link to="/howitworks">
          <CustomButton>Read more</CustomButton>
        </Link>
      </div>
    </div>
    <div className="about">
      <div className="about-text">
        <h2>About</h2>
        <p>
          Youdeygo is a free online Community created for the purpose of
          connecting and conveying reliable citizens of Lagos from one location
          to the other by means of ride sharing, we ensure you get the best
          experience during your safe travels around Lagos state.
        </p>
        <Link to="/about">
          <CustomButton>Read more</CustomButton>
        </Link>
      </div>
      <div className="about-image">
        <img className="image" src={imageOne} alt="young africans in car" />
      </div>
    </div>
  </div>
);

export default LandingPage;
