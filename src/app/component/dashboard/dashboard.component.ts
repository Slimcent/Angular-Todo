import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudServiceService } from 'src/app/service/crud-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
taskObj : Task = new Task();
taskArray : Task[] = [];

addTaskValue : string = '';
editTaskValue : string = '';

  constructor(private crudService : CrudServiceService) { }

  ngOnInit(): void {
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTask();
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe( res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
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

  deleteTask(task : Task){
    this.crudService.deleteTask(task).subscribe( res => {
      this.ngOnInit();
    }, res => {
      alert("Task delete failed");
    });
  }

  call(task : Task){
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }
}
