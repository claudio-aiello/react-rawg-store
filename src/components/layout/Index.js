import React from "react";
import Store from "../store/Store";
import Search from "../store/Search";

const Index = ({ storePage }) => {
  return (
    <React.Fragment>
      <Search />
      <Store />
    </React.Fragment>
  );
};

export default Index;
