import { Link } from "react-router-dom";
import Logo from "../../assests/logo.png";
import "./header.style.css";

const toogle = () => {
  var nav = document.getElementById("nav");
  nav.classList.toggle("none");
};

const Header = () => (
  <div className="header">
    <div className="logo-div">
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
    </div>
    <div className="links" id="nav" onClick={toogle}>
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/howitworks" className="link">
        How it works
      </Link>
      <Link to="/about" className="link">
        About
      </Link>
      <Link to="/signin">
        <div className="signin">Sign in</div>
      </Link>
    </div>
    <div className="bar" onClick={toogle}>
      <i className="fa fa-bars"></i>
    </div>
  </div>
);

export default Header;