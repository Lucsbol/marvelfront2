import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav header">
      <div className="container">
        <Link to="/home" className="header-link">
          <img src={logo} alt="Logo marvel" />
        </Link>
        <div className="header-links">
          {" "}
          <Link to="/characters" className="header-link">
            PERSONNAGES
          </Link>
          <Link to="/comics" className="header-link">
            COMICS
          </Link>
          <Link to="/favoris" className="header-link">
            <span className="header-link">FAVORIS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
