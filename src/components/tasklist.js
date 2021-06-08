import React, { Component } from "react";
import TaskItem from "./taskitem"
class TaskList extends Component {
  render() {
    var {tasks} = this.props;
    var elementTask = tasks.map((task,index) => {
      return <TaskItem 
      key={task.id} task={task} index={index}
      onUpdateStatus={this.props.onUpdateStatus}
      onDelete = {this.props.onDelete}
      onUpDate = {this.props.onUpDate}
      />;
    })
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col">Tên công việc</th>
            <th scope="col" className="text-center">
              Dự định làm CV
            </th>
            <th scope="col" className="text-center">
              Thời gian
            </th>
            <th scope="col" className="text-center">
              Trạng thái
            </th>
            <th scope="col" className="text-center">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-light">
            <th scope="row" className="text-center">
              1
            </th>
            <td>
              <input type="search" className="form-control" />
            </td>
            <th></th>
            <td />
            <td>
              <div className="mb-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Tất cả</option>
                  <option value={1}>hoàn thành</option>
                  <option value={2}>chưa</option>
                </select>
              </div>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

export default TaskList;
