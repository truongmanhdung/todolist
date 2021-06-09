import React, { Component } from "react";

class TaskItem extends Component {
  // props update status
  onUpdateStatus = ()=>{
    this.props.onUpdateStatus(this.props.task.id);
  }
  // props delete
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }
  // props update
  onUpDate = () => {
    this.props.onUpDate(this.props.task.id);
  }
  render() {
    var {task,index} = this.props;
    return (
      <tr>
        <th scope="row" className="text-center">
        {index + 1}
        </th>
        <td>{task.name}</td>
        <td className="text-center">{task.time_start}</td>
        <td className="text-center">{task.time}p</td>
        <td className="text-center">
          <span onClick={this.onUpdateStatus} className={task.status===true?'btn btn-primary':'btn btn-danger'}>
          {task.status===true?'hoàn thành':'chưa'}
            </span>
        </td>
        <td className="text-center">
          <button className="btn btn-primary me-2" onClick={this.onUpDate}>
            <i className="fas fa-edit" /> Sửa
          </button>
          <button className="btn btn-danger" onClick={this.onDelete}>
            <i className="fas fa-trash-alt" /> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
