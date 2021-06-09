import React, { Component } from "react";
class sort extends Component {
  render() {
    return (
      <div className="search">
        <div>
          <form className="d-flex">
            <div className="mb-3">
              <select className="form-select" aria-label="Default select example">
                <option >Sắp xếp</option>
                <option value="1">Từ A-Z</option>
                <option value="2">Từ Z-A</option>
                <option value="3">Hoàn thành</option>
                <option value="4">Chưa hoàn thành</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default sort;
