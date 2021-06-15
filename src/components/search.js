import React, { Component } from "react";
class search extends Component {
  render() {
    return (
      <div className="search">
        <div>
          <form className="d-flex">
            <input type="search" name="search" required className="form-control" />
            <button className="btn btn-primary" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default search;
