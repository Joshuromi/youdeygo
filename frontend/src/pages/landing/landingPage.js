import Form from "../../components/form/form.component";
import imageOne from "../../assests/young-africans.jpg";
import "./landingPage.css";

const LandingPage = () => (
  <div className="landing-page">
    <div className="intro">
      <div className="intro-text">
        <h1>Find a comfortable and affordable ride going your direction</h1>
        <p>Share a ride | Make new friends | Earn cash</p>
      </div>
      <div className="form-div">
        <Form />
      </div>
    </div>
    <div className="about">
      <div className="about-image">
        <img src={imageOne} alt="young africans in car" />
      </div>
      <div className="about-info">
        <h1>What we Offer</h1>
        <p>We offer a community where you can share </p>
      </div>
    </div>
  </div>
);

export default LandingPage;
