import React from "react";

import { Outlet } from "react-router-dom";

import "./layout.scss";

const SharedLayout: React.FC = () => {
  return (
    <div className={"flex flex-col"}>
      <nav></nav>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
