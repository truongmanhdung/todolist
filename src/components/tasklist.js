import React, { Component } from "react";
import TaskItem from "./taskitem"
class TaskList extends Component {
  // tạo constructor
  constructor(props){
    super(props);
    this.state = {
      fillterName: '',
      fillterStatus: -1 //all: -1, active: 1,deactive: 0
    }
  }
  // sự kiện onchange
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    // in ra fillter
    this.props.onFillter(name ==='fillterName'? value : this.state.fillterName ,
     name ==='fillterStatus'? value : this.state.fillterStatus)
    this.setState({
      [name]: value
    });

  }

  render() {
    var {tasks} = this.props;//lấy ra tasks 
    var {fillterName,fillterStatus} = this.state;//lây ra các biến truyền vào fillter
    var elementTask = tasks.map((task,index) => {//lặp qua
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
             
            </th>
            <td>
              <input type="search" name="fillterName" value={fillterName} onChange={this.onChange} className="form-control" />
            </td>
            <th></th>
            <td />
            <td>
              <div className="mb-3">
                <select
                  name="fillterStatus"
                  value={fillterStatus} onChange={this.onChange}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value={-1}>Tất cả</option>
                  <option value={1}>hoàn thành</option>
                  <option value={0}>chưa</option>
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
