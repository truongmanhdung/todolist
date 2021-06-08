import React, { Component } from "react";
import Search from "./search";
import Sort from "./sort";
class control extends Component {
  render() {
    return (
      <div className="d-flex justify-content-between align-items">
        <Search/>
        <Sort/>
      </div>
    );
  }
}

export default control;
