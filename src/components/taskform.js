import React, { Component } from "react";
import {connect} from 'react-redux'
import * as actions from "../actions/index";
class TaskForm extends Component {
 
  // tạo constructor
  constructor(props){
    super(props);
    this.state = {
      id:'',
      name: '',
      time_start: '',
      time: 0,
      status: true
    }
  }
  // đổ ra khi components đc gọi, chỉ đc gọi duy nhất 1 lần
  componentDidMount(){
    if(this.props.task){
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        time_start: this.props.task.time_start,
        time : this.props.task.time,
        status : this.props.task.status,
      })
    }
  }
  // đổ ra khi có 1 sự kiện xuất hiện, thay đổi đc nhiều lúc
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        time_start: nextProps.task.time_start,
        time : nextProps.task.time,
        status : nextProps.task.status,
      })
    }else if(nextProps && nextProps.task===null){//sửa thành thêm
      this.setState ({
        id:'',
        name: '',
        time_start: '',
        time: 0,
        status: true
      })
    }
  }
   // hàm đóng form
   onLockForm = ()=>{
    this.props.onCloseForm();
  }
  // hàm date
  date = () =>{
    const today = Date.now();
    var date = Intl.DateTimeFormat('vn', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
    return date;
  }
  // xóa form
  onClearForm = () => {
    this.setState({
      name: '',
      time_start: '',
      time: 0,
      status: false
    })
  }
  // sự kiện onchange
  onChange = (event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]:value
    })
  }
  // sự kiện submit
  onSubmit = (event)=>{
    event.preventDefault();
    this.props.onAddTask(this.state);
    // this.props.onSubmit(this.state);
    this.onClearForm();
    this.onLockForm();
  }
  render() {
    var {id} = this.state;
    if(!this.props.isDisplayform) return '';
    return (
      <div>
        <div className="d-flex bg-primary p-3 color-white justify-content-between align-items-center">
          <span>{ id !== ''?'Sửa công việc':'Thêm công việc'}</span>
          <i className="fas fa-times cursor" onClick={this.onLockForm}></i>
        </div>
        <form className="p-4 bg-light" onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên công việc</label>
            <input type="text" className="form-control" required name="name" value={this.state.name}
             onChange={this.onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Lúc thực hiện</label>
            <input type="datetime-local" className="form-control" required  name="time_start" onChange={this.onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Thời gian thực hiện</label>
            <input type="number" className="form-control" required min="0" name="time" value={this.state.time} onChange={this.onChange} />
          </div>
          <div className="mb-3">
            <select name="status" onChange={this.onChange} className="form-select">
              <option value={true}>Đã hoàn thành</option>
              <option value={false}>Chưa hoàn thành</option>
            </select>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary me-2">
              Thêm
            </button>
            <button onClick={this.onClearForm} type="reset" className="btn btn-danger">
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    isDisplayform: state.isDisplayform
  }
}

const mapDispatchToProps = (dispatch,props) =>{
  return {
    onAddTask: (task) =>{
      dispatch(actions.addTask(task))
    },
    onCloseForm: () =>{
      dispatch(actions.closeForm())
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
