import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Table2 from "../Table2/Table2"

import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      {/* <Cards /> */}
      <Table />
      <Table2 />
    </div>
  );
};

export default MainDash;
