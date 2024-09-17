import React from "react";

import { Outlet } from "react-router-dom";

import "./layout.scss";

const SharedLayout: React.FC = () => {
  return (
    <div className={"flex flex-col h-screen p-4"}>
      {/*<nav className="flex flex-row justify-between">*/}
      {/*  <UsersAutocomplete />*/}
      {/*  <div className="flex flex-row gap-2 items-center">*/}
      {/*    <Button onClick={getPreviousWeek}>*/}
      {/*      <i className="pi pi-arrow-left"></i>*/}
      {/*    </Button>*/}
      {/*    <h3>*/}
      {/*      {day} {month.toUpperCase()} {year}*/}
      {/*    </h3>*/}
      {/*    <Button onClick={getNextWeek}>*/}
      {/*      {" "}*/}
      {/*      <i className="pi pi-arrow-right"></i>{" "}*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*  <Button className="w-[200px]">*/}
      {/*    <i className="pi pi-sign-in mr-2"></i>Увійти*/}
      {/*  </Button>*/}
      {/*</nav>*/}
      <div className="h-[inherit]">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
