import React from "react";
import { Link } from "react-router-dom";

const Home2 = () => {
  return (
    <div className="home2">
      <div className="home-container">
        <div className="left">
          <Link to="/comics">
            <img src="src/assets/images/comics.png" alt="Comics" />
            <h1>← VOIR LES COMICS</h1>
          </Link>
        </div>
        <div className="right">
          <Link to="/characters">
            <img src="src/assets/images/hero.png" alt="Personnages" />
            <h1>VOIR LES PERSONNAGES → </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home2;
