import React from "react";
import { Link } from "react-router-dom";

import comicsImage from "../assets/images/comics.svg";
import heroImage from "../assets/images/hero.svg";

const Home2 = () => {
  return (
    <div className="home2">
      <div className="home-container">
        <div className="left">
          <Link to="/comics">
            <img src={comicsImage} alt="Comics" />
            <h1>← VOIR LES COMICS</h1>
          </Link>
        </div>
        <div className="right">
          <Link to="/characters">
            <img src={heroImage} alt="Personnages" />
            <h1>VOIR LES PERSONNAGES →</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home2;
