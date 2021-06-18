import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/index'
class TaskItem extends Component {
  // props update status
  onUpdateStatus = ()=>{
    this.props.onUpdateStatus(this.props.task.id)
  }
  
  // props delete
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
    this.props.onCloseForm();
  }
  // props update
  onEditTask = () => {
    // this.props.onUpDate(this.props.task.id);
    this.props.openForm();
    this.props.onEditTask(this.props.task);
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
          <button className="btn btn-primary me-2" onClick={this.onEditTask}>
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

const mapStateToProps = (state) =>{
  return {
  }
}

const mapDispatchToProps = (dispatch,props) =>{
  return {
    onUpdateStatus: (id) =>{
      dispatch(actions.onUpdateStatus(id))
    },
    onDelete: (id) =>{
      dispatch(actions.onDelete(id))
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm())
    },
    openForm: () =>{
      dispatch(actions.openForm())
    },
    onEditTask: (task) =>{
      dispatch(actions.onEditTask(task))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
