import React from "react";
import spinner from "../../assets/img/spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ margin: "50px auto", display: "block" }}
      />
    </div>
  );
};
