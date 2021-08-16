import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Overlay = () => {
  const { toggleNav, showNav } = useContext(StoreContext);

  const handleClick = () => {
    toggleNav(false);
  };

  return (
    <div
      className={showNav === true ? "overlay" : "hide"}
      onClick={handleClick}
    ></div>
  );
};

export default Overlay;
