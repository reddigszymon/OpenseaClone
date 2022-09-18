import React from "react";
import Header from "../components/Header/Header";
import CreateNewItem from "../components/CreateNewItem/CreateNewItem";

function create() {
  return (
    <div>
      <Header />
      <div className="px-[20px]">
        <CreateNewItem />
      </div>
    </div>
  );
}

export default create;
