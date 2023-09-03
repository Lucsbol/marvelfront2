import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="nav-footer">
      <div className="container">
        <div className="logo-and-text">
          <img
            className="logofooter"
            src="https://pasdecote.co/wp-content/uploads/2022/12/bl-4.png"
            alt="Logo pdc"
          />
          <Link to="https://github.com/Lucsbol" className="footer-link">
            <span className="bold-text">Fait avec ❤ par Lucas Bolivard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
