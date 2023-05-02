import { Component, OnInit } from '@angular/core';
//import { Task } from 'src/app/model/task';
import { ITask } from 'src/app/Interface/ITask';
import { CrudServiceService } from 'src/app/service/crud-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  taskObj!: ITask;
  taskArray : ITask[] = [];
  
addTaskValue : string = '';
editTaskValue : string = '';

  constructor(private crudService : CrudServiceService) { }

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskArray = [];
    this.getAllTask();
  }
 
  addTask(){
    if(this.addTaskValue == ''){
      alert("Empty text")
      return;
    }

    const newTask : ITask = {
      task_name : this.addTaskValue
    }

    this.crudService.addTask(newTask).subscribe( res => {
      this.ngOnInit();
      this.addTaskValue = '';
    });
  }

  getAllert(){
    alert("okay");
  }

  getAllTask(){
    this.crudService.getAllTask().subscribe( res => {
      this.taskArray = res;
    }, err => {
      alert(err);
    });
  }

  editTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe( res => {
      this.ngOnInit();
    }, err => {
      alert("Task update failed");
    });
  }

  deleteTask(task : ITask){
    this.crudService.deleteTask(task).subscribe( res => {
      this.ngOnInit();
    }, res => {
      alert("Task delete failed");
    });
  }

  call(task : ITask){
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }
}
