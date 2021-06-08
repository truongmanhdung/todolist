import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/taskform";
import Control from "./components/control";
import TaskList from "./components/tasklist"
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayform: false,
      taskEdit: null,
    }
  }
  
  componentDidMount(){
    if(localStorage && localStorage.getItem){
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      })
    }
  }
  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }
  generateID(){
    return this.s4()+'/'+ this.s4()+'-'+this.s4()+'-'+this.s4();
  }
  displayForm = ()=>{
    this.setState({
      isDisplayform: !this.state.isDisplayform
    })
  }
  onLockForm = ()=>{
    this.setState({
      isDisplayform: false,
    })
  }
  onShowForm = ()=>{
    this.setState({
      isDisplayform: true
    })
  }
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
  onUpDate = (id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEdit = tasks[index];
    this.setState({
      taskEdit: taskEdit
    })
    this.onShowForm();
  }
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
  render() {
    var { tasks, isDisplayform, taskEdit } = this.state;
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
