import { Link } from "react-router-dom";
import Logo from "../../assests/logo.svg";
import "./header.style.css";

const Header = () => (
  <div className="header">
    <div className="logo">
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
    </div>
    <div className="links">
      <Link to="/howitworks" className="link">
        How it works
      </Link>
      <Link to="/about" className="link">
        About us
      </Link>
      <div className="link">
        <Link to="signin">Sign in</Link>
      </div>
    </div>
  </div>
);

export default Header;
