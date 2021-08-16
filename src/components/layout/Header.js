import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faHeart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <h1 style={{ textAlign: "left", padding: "20px" }}>
        <Link to="/" style={{ fontSize: "2rem" }}>
          Rawg store
        </Link>
      </h1>
      <div className="buttonHeaderContainer">
        <Link to="/library">
          <div className="btn nav-tab">
            <FontAwesomeIcon icon={faGamepad} className="nav-icon" />
            <span>My library</span>
          </div>
        </Link>
        <Link to="/favorites">
          <div className="btn nav-tab">
            <FontAwesomeIcon icon={faHeart} className="nav-icon" />
            <span>My favorites</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
