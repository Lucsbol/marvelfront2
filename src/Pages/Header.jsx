import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="nav header">
      <div className="container">
        <img src={logo} alt="Logo marvel" />
        <div className="header-links">
          {" "}
          {/* Utilisation de la classe "header-links" */}
          <Link to="/characters" className="header-link">
            PERSONNAGES
          </Link>
          <Link to="/comics" className="header-link">
            COMICS
          </Link>
          <span className="header-link">FAVORIS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
