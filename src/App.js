import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/taskform";
import Control from "./components/control";
import TaskList from "./components/tasklist";
class App extends Component {
  // tạo construstor
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayform: false,
      taskEdit: null,
      filter: {
        name: '',
        status: -1,
      },
    }
    localStorage.setItem('tasks', JSON.stringify([]))
  }
  new(){
    
  }
  //khi mở form sẽ chạy lệnh, chỉ chạy duy nhất 1 lần mỗi khi component đc gửi
  componentDidMount(){
    if(localStorage && localStorage.getItem){
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      })
    }
  }
  // format id
  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }
  // hàm return ra id 
  generateID(){
    return this.s4()+'/'+ this.s4()+'-'+this.s4()+'-'+this.s4();
  }
  // đóng mở form
  displayForm = ()=>{
    // khi edit thì chuyển đổi form
    if(this.state.isDisplayform && this.state.taskEdit!==null){
      this.setState({
        isDisplayform: true,
        taskEdit: null
      })
    // ngược lại
    }else{
      this.setState({
        isDisplayform: !this.state.isDisplayform,
        taskEdit: null
      })
    }
    
  }
  // đóng form
  onLockForm = ()=>{
    this.setState({
      isDisplayform: false,
    })
  }
  // mở form thêm, sửa
  onShowForm = ()=>{
    this.setState({
      isDisplayform: true
    })
  }
  // lưu data
  onSubmit = (data)=>{
    var {tasks} = this.state;
    if(data.id===''){
      data.id = this.generateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEdit: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // update trạng thái
  onUpdateStatus = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  // delete
  onDelete = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onLockForm();
  }
  // update
  onUpDate = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    })
    this.onShowForm();
  }
  // tìm index
  findIndex = (id)=>{
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index;
      }
    });
    return result;
    
  }
  // tìm kiếm filter thay đổi onchange
  onFillter = (fillterName,fillterStatus) =>{
    fillterStatus = parseInt(fillterStatus);
    this.setState({
      filter: {
        name: fillterName.toLowerCase(),
        status: fillterStatus,
      }
    })
  }
  render() {
    var { tasks, isDisplayform, taskEdit,filter } = this.state;//lấy ra các tasks, chuyển trạng thái
    if(filter){//kiểm tra filter
      if(filter.name){//kiểm tra có name ko
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !==-1; // chuyển thành chữ viết thường và in ra
        })
      }
      tasks = tasks.filter((task)=>{
        if(filter.status ===-1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    var elementTaskForm = isDisplayform ? <TaskForm
    task={taskEdit}
    onSubmit={this.onSubmit}
    onLockForm={this.onLockForm}/> : '';
    return (
      <div>
        <div className="container mt-5">
          <div className="header">
            <h2 className="text-center mb-5">Quản lý công việc</h2>
          </div>
        </div>
        <div className="row container">
          <div className={isDisplayform===true ? 'edit col-3': ''}>
            {/* taskform */}
            {elementTaskForm}
          </div>

          <div className={isDisplayform===true ? 'col-9': 'col-12'}>
            <div className="add_todolist mb-3">
              <button className="btn btn-primary" onClick={this.displayForm}>
                <i className="fas fa-plus" /> Thêm công việc
              </button>
            </div>
            <Control/>
            <div className="todolist-body">
              <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus}
                onDelete = {this.onDelete}
                onUpDate = {this.onUpDate}
                onFillter = {this.onFillter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
